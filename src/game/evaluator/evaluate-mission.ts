import type {
  EvaluationDefinition,
  Mission,
  MissionTest,
  TestResult,
} from "../../types/game";

/**
 * ------------------------------------------------
 * TEXT HELPERS
 * ------------------------------------------------
 */

function normalizeText(
  value: string | null | undefined,
): string {
  return (value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * ------------------------------------------------
 * FORM HELPERS
 * ------------------------------------------------
 */

function findAssociatedFieldByLabel(
  document: Document,
  labelIncludes: string[],
):
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | null {
  const expectedValues =
    labelIncludes.map((value) =>
      normalizeText(value),
    );

  const labels = Array.from(
    document.querySelectorAll("label"),
  );

  const matchingLabel =
    labels.find((label) => {
      const text =
        normalizeText(
          label.textContent,
        );

      return expectedValues.some(
        (expected) =>
          text.includes(expected),
      );
    });

  if (!matchingLabel) {
    return null;
  }

  /**
   * Variant 1:
   *
   * <label>
   *   Email
   *   <input>
   * </label>
   */
  const wrappedField =
    matchingLabel.querySelector<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >(
      "input, textarea, select",
    );

  if (wrappedField) {
    return wrappedField;
  }

  /**
   * Variant 2:
   *
   * <label for="mail">
   *   Email
   * </label>
   *
   * <input id="mail">
   */
  const targetId =
    matchingLabel.getAttribute(
      "for",
    );

  if (!targetId) {
    return null;
  }

  const field =
    document.getElementById(
      targetId,
    );

  if (
    field instanceof
      HTMLInputElement ||
    field instanceof
      HTMLTextAreaElement ||
    field instanceof
      HTMLSelectElement
  ) {
    return field;
  }

  return null;
}

/**
 * ------------------------------------------------
 * CSS HELPERS
 * ------------------------------------------------
 */

function normalizeCssSelector(
  value: string,
): string {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeCssValue(
  property: string,
  value: string,
): string {
  /**
   * Let the browser CSS parser normalize
   * valid CSS values for us.
   *
   * This helps comparisons between equivalent
   * CSS representations.
   */
  const element =
    window.document.createElement(
      "div",
    );

  element.style.setProperty(
    property,
    value,
  );

  const normalized =
    element.style.getPropertyValue(
      property,
    );

  return (
    normalized || value
  )
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getCssStyleRules(
  source: string,
): CSSStyleRule[] {
  if (
    typeof CSSStyleSheet ===
    "undefined"
  ) {
    return [];
  }

  try {
    const sheet =
      new CSSStyleSheet();

    sheet.replaceSync(source);

    const result:
      CSSStyleRule[] = [];

    function visitRules(
      rules: CSSRuleList,
    ) {
      for (
        const rule of
        Array.from(rules)
      ) {
        if (
          rule.type ===
          CSSRule.STYLE_RULE
        ) {
          result.push(
            rule as CSSStyleRule,
          );

          continue;
        }

        /**
         * Allows us to inspect rules nested
         * inside things like @media later.
         */
        const nestedRules =
          (
            rule as CSSRule & {
              cssRules?: CSSRuleList;
            }
          ).cssRules;

        if (nestedRules) {
          visitRules(
            nestedRules,
          );
        }
      }
    }

    visitRules(
      sheet.cssRules,
    );

    return result;
  } catch {
    return [];
  }
}

function findCssRules(
  source: string,
  selector: string,
): CSSStyleRule[] {
  const target =
    normalizeCssSelector(
      selector,
    );

  return getCssStyleRules(
    source,
  ).filter((rule) => {
    /**
     * Also supports:
     *
     * h1,
     * h2 {
     *   ...
     * }
     */
    const selectors =
      rule.selectorText
        .split(",")
        .map(
          normalizeCssSelector,
        );

    return selectors.includes(
      target,
    );
  });
}

/**
 * ------------------------------------------------
 * EVALUATION
 * ------------------------------------------------
 */

function evaluateDefinition(
  document: Document | null,
  source: string,
  definition: EvaluationDefinition,
): boolean {
  const requiresDocument =
    definition.type !==
      "cssSelectorExists" &&
    definition.type !==
      "cssProperty";

  if (
    requiresDocument &&
    !document
  ) {
    return false;
  }

  const htmlDocument =
    document as Document;

  switch (definition.type) {
    /**
     * ------------------------------------------------
     * BASIC HTML
     * ------------------------------------------------
     */

    case "elementExists": {
      return (
        htmlDocument.querySelector(
          definition.selector,
        ) !== null
      );
    }

    case "elementCount": {
      return (
        htmlDocument.querySelectorAll(
          definition.selector,
        ).length ===
        definition.count
      );
    }

    case "elementCountAtLeast": {
      return (
        htmlDocument.querySelectorAll(
          definition.selector,
        ).length >=
        definition.count
      );
    }

    case "selectorsExist": {
      return definition.selectors.every(
        (selector) =>
          htmlDocument.querySelector(
            selector,
          ) !== null,
      );
    }

    /**
     * ------------------------------------------------
     * TEXT
     * ------------------------------------------------
     */

    case "textContains": {
      const element =
        htmlDocument.querySelector(
          definition.selector,
        );

      if (!element) {
        return false;
      }

      return normalizeText(
        element.textContent,
      ).includes(
        normalizeText(
          definition.value,
        ),
      );
    }

    case "textNotContains": {
      const element =
        htmlDocument.querySelector(
          definition.selector,
        );

      if (!element) {
        return false;
      }

      return !normalizeText(
        element.textContent,
      ).includes(
        normalizeText(
          definition.value,
        ),
      );
    }

    case "elementsContainTexts": {
      const elements =
        Array.from(
          htmlDocument.querySelectorAll(
            definition.selector,
          ),
        );

      const elementTexts =
        elements.map((element) =>
          normalizeText(
            element.textContent,
          ),
        );

      return definition.values.every(
        (expectedValue) => {
          const normalizedExpected =
            normalizeText(
              expectedValue,
            );

          return elementTexts.some(
            (text) =>
              text.includes(
                normalizedExpected,
              ),
          );
        },
      );
    }

    /**
     * ------------------------------------------------
     * ATTRIBUTES
     * ------------------------------------------------
     */

    case "attributeExists": {
      const element =
        htmlDocument.querySelector(
          definition.selector,
        );

      if (!element) {
        return false;
      }

      return element.hasAttribute(
        definition.attribute,
      );
    }

    case "attributeNotBlank": {
      const element =
        htmlDocument.querySelector(
          definition.selector,
        );

      if (!element) {
        return false;
      }

      const value =
        element.getAttribute(
          definition.attribute,
        );

      return (
        normalizeText(value).length >
        0
      );
    }

    case "attributeEquals": {
      const element =
        htmlDocument.querySelector(
          definition.selector,
        );

      if (!element) {
        return false;
      }

      return (
        normalizeText(
          element.getAttribute(
            definition.attribute,
          ),
        ) ===
        normalizeText(
          definition.value,
        )
      );
    }

    /**
     * ------------------------------------------------
     * FORMS
     * ------------------------------------------------
     */

    case "allFieldsHaveLabels": {
      const fields =
        Array.from(
          htmlDocument.querySelectorAll<
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement
          >(
            definition.selector,
          ),
        );

      if (
        fields.length === 0
      ) {
        return false;
      }

      const labels =
        Array.from(
          htmlDocument.querySelectorAll(
            "label",
          ),
        );

      return fields.every(
        (field) => {
          /**
           * Variant 1:
           *
           * <label>
           *   Name
           *   <input>
           * </label>
           */
          if (
            field.closest("label")
          ) {
            return true;
          }

          /**
           * Variant 2:
           *
           * <label for="name">
           *   Name
           * </label>
           *
           * <input id="name">
           */
          const id =
            field.getAttribute(
              "id",
            );

          if (!id) {
            return false;
          }

          return labels.some(
            (label) =>
              label.getAttribute(
                "for",
              ) === id,
          );
        },
      );
    }

    case "formFieldAttribute": {
      const field =
        findAssociatedFieldByLabel(
          htmlDocument,
          definition.labelIncludes,
        );

      if (!field) {
        return false;
      }

      switch (
        definition.mode
      ) {
        case "exists":
          return field.hasAttribute(
            definition.attribute,
          );

        case "notBlank": {
          const value =
            field.getAttribute(
              definition.attribute,
            );

          return (
            normalizeText(
              value,
            ).length > 0
          );
        }

        case "equals":
          if (
            definition.value ===
            undefined
          ) {
            return false;
          }

          return (
            normalizeText(
              field.getAttribute(
                definition.attribute,
              ),
            ) ===
            normalizeText(
              definition.value,
            )
          );

        default:
          return false;
      }
    }

    /**
     * ------------------------------------------------
     * ACCESSIBILITY / STRUCTURE
     * ------------------------------------------------
     */

    case "headingOrderValid": {
      const headings =
        Array.from(
          htmlDocument.querySelectorAll(
            "h1, h2, h3, h4, h5, h6",
          ),
        );

      if (
        headings.length === 0
      ) {
        return false;
      }

      const levels =
        headings.map((heading) =>
          Number(
            heading.tagName.substring(
              1,
            ),
          ),
        );

      /**
       * The document hierarchy should
       * begin with h1.
       */
      if (
        levels[0] !== 1
      ) {
        return false;
      }

      /**
       * Heading levels may move upwards freely,
       * but should not skip levels going deeper.
       *
       * h1 -> h2 = valid
       * h2 -> h3 = valid
       * h3 -> h2 = valid
       *
       * h1 -> h3 = invalid
       */
      for (
        let index = 1;
        index < levels.length;
        index++
      ) {
        const previous =
          levels[index - 1];

        const current =
          levels[index];

        if (
          current >
          previous + 1
        ) {
          return false;
        }
      }

      return true;
    }

    case "internalLinksResolve": {
      const links =
        Array.from(
          htmlDocument.querySelectorAll<HTMLAnchorElement>(
            definition.selector,
          ),
        );

      if (
        links.length === 0
      ) {
        return false;
      }

      return links.every(
        (link) => {
          const href =
            link.getAttribute(
              "href",
            );

          if (
            !href ||
            !href.startsWith(
              "#",
            ) ||
            href === "#"
          ) {
            return false;
          }

          const targetId =
            href.substring(1);

          if (!targetId) {
            return false;
          }

          return (
            htmlDocument.getElementById(
              targetId,
            ) !== null
          );
        },
      );
    }

    /**
     * ------------------------------------------------
     * CSS
     * ------------------------------------------------
     */

    case "cssSelectorExists": {
      return (
        findCssRules(
          source,
          definition.selector,
        ).length > 0
      );
    }

    case "cssProperty": {
      const rules =
        findCssRules(
          source,
          definition.selector,
        );

      if (
        rules.length === 0
      ) {
        return false;
      }

      return rules.some(
        (rule) => {
          const value =
            rule.style
              .getPropertyValue(
                definition.property,
              )
              .trim();

          switch (
            definition.mode
          ) {
            case "exists":
              return (
                rule.style.getPropertyValue(
                  definition.property,
                ) !== ""
              );

            case "notBlank":
              return (
                value.length > 0
              );

            case "equals":
              if (
                definition.value ===
                undefined
              ) {
                return false;
              }

              return (
                normalizeCssValue(
                  definition.property,
                  value,
                ) ===
                normalizeCssValue(
                  definition.property,
                  definition.value,
                )
              );

            case "contains":
              if (
                definition.value ===
                undefined
              ) {
                return false;
              }

              return value
                .toLowerCase()
                .includes(
                  definition.value
                    .toLowerCase(),
                );

            default:
              return false;
          }
        },
      );
    }

    default:
      return false;
  }
}

/**
 * ------------------------------------------------
 * TEST RUNNER
 * ------------------------------------------------
 */

function runTest(
  document: Document | null,
  source: string,
  test: MissionTest,
): TestResult {
  return {
    testId:
      test.id,

    label:
      test.label,

    visibility:
      test.visibility,

    passed:
      evaluateDefinition(
        document,
        source,
        test.evaluate,
      ),
  };
}

/**
 * ------------------------------------------------
 * MISSION EVALUATION
 * ------------------------------------------------
 */

export function evaluateMission(
  mission: Mission,

  workspace: Record<
    string,
    string
  >,
): TestResult[] {
  const defaultEntryFile =
    mission.preview
      ?.entryFile ??
    mission.files.find(
      (file) =>
        file.language ===
        "html",
    )?.path ??
    mission.files[0]?.path;

  if (!defaultEntryFile) {
    return [];
  }

  /**
   * Parsed HTML documents are cached so that
   * repeated tests on the same file do not
   * repeatedly invoke DOMParser.
   */
  const documentCache =
    new Map<
      string,
      Document
    >();

  function getDocument(
    path: string,
  ): Document | null {
    const existing =
      documentCache.get(path);

    if (existing) {
      return existing;
    }

    const missionFile =
      mission.files.find(
        (file) =>
          file.path === path,
      );

    if (
      !missionFile ||
      missionFile.language !==
        "html"
    ) {
      return null;
    }

    const html =
      workspace[path] ??
      missionFile.content;

    const parser =
      new DOMParser();

    const document =
      parser.parseFromString(
        html,
        "text/html",
      );

    documentCache.set(
      path,
      document,
    );

    return document;
  }

  return mission.testGroups.flatMap(
    (group) =>
      group.tests.map(
        (test) => {
          const filePath =
            test.filePath ??
            defaultEntryFile;

          const missionFile =
            mission.files.find(
              (file) =>
                file.path ===
                filePath,
            );

          if (!missionFile) {
            return {
              testId:
                test.id,

              label:
                test.label,

              visibility:
                test.visibility,

              passed:
                false,
            };
          }

          /**
           * Raw source is used by CSS tests.
           */
          const source =
            workspace[filePath] ??
            missionFile.content;

          /**
           * HTML tests receive a parsed document.
           * CSS/plaintext/JS tests receive null.
           */
          const document =
            missionFile.language ===
            "html"
              ? getDocument(
                  filePath,
                )
              : null;

          return runTest(
            document,
            source,
            test,
          );
        },
      ),
  );
}