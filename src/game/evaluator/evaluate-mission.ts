import type {
  EvaluationDefinition,
  Mission,
  MissionTest,
  TestResult,
} from "../../types/game";

function normalizeText(
  value: string | null | undefined,
): string {
  return (value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function findAssociatedFieldByLabel(
  document: Document,
  labelIncludes: string[],
):
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | null {
  const expectedValues =
    labelIncludes.map(
      (value) =>
        normalizeText(value),
    );

  const labels =
    Array.from(
      document.querySelectorAll(
        "label",
      ),
    );

  const matchingLabel =
    labels.find((label) => {
      const text =
        normalizeText(
          label.textContent,
        );

      return expectedValues.some(
        (expected) =>
          text.includes(
            expected,
          ),
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
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
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

function evaluateDefinition(
  document: Document,
  definition: EvaluationDefinition,
): boolean {
  switch (definition.type) {
    case "elementExists": {
      return (
        document.querySelector(
          definition.selector,
        ) !== null
      );
    }

    case "elementCount": {
      return (
        document.querySelectorAll(
          definition.selector,
        ).length ===
        definition.count
      );
    }

    case "elementCountAtLeast": {
      return (
        document.querySelectorAll(
          definition.selector,
        ).length >=
        definition.count
      );
    }

    case "textContains": {
      const element =
        document.querySelector(
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

    case "elementsContainTexts": {
      const elements =
        Array.from(
          document.querySelectorAll(
            definition.selector,
          ),
        );

      const elementTexts =
        elements.map(
          (element) =>
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

    case "attributeExists": {
      const element =
        document.querySelector(
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
        document.querySelector(
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
        document.querySelector(
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

    case "allFieldsHaveLabels": {
      const fields =
        Array.from(
          document.querySelectorAll<
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
          document.querySelectorAll(
            "label",
          ),
        );

      return fields.every(
        (field) => {
          /**
           * Wrapped label
           */
          if (
            field.closest(
              "label",
            )
          ) {
            return true;
          }

          /**
           * for / id association
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
          document,
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

    case "headingOrderValid": {
      const headings = Array.from(
        document.querySelectorAll(
          "h1, h2, h3, h4, h5, h6",
        ),
      );

      if (headings.length === 0) {
        return false;
      }

      const levels = headings.map(
        (heading) =>
          Number(
            heading.tagName.substring(1),
          ),
      );

      /**
       * The document should begin its heading
       * hierarchy with h1.
       */
      if (levels[0] !== 1) {
        return false;
      }

      /**
       * Heading levels may move upward freely:
       *
       * h3 -> h2
       * h2 -> h1
       *
       * But they should not skip levels downward:
       *
       * h1 -> h3
       * h2 -> h4
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
      const links = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          definition.selector,
        ),
      );

      if (links.length === 0) {
        return false;
      }

      return links.every((link) => {
        const href =
          link.getAttribute("href");

        if (
          !href ||
          !href.startsWith("#") ||
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
          document.getElementById(
            targetId,
          ) !== null
        );
      });
    }

    case "textNotContains": {
      const element =
        document.querySelector(
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

    case "selectorsExist": {
      return definition.selectors.every(
        (selector) => 
          document.querySelector(
            selector,
          ) !== null,
      );
    }

    default:
      return false;
  }
}

function runTest(
  document: Document,
  test: MissionTest,
): TestResult {
  return {
    testId: test.id,
    label: test.label,
    visibility:
      test.visibility,

    passed:
      evaluateDefinition(
        document,
        test.evaluate,
      ),
  };
}

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
    )?.path;

  if (!defaultEntryFile) {
    return [];
  }

  /**
   * Parse every HTML file only once,
   * even when several tests use it.
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
      documentCache.get(
        path,
      );

    if (existing) {
      return existing;
    }

    const html =
      workspace[path];

    if (!html) {
      return null;
    }

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

          const document =
            getDocument(
              filePath,
            );

          if (!document) {
            return {
              testId:
                test.id,

              label:
                test.label,

              visibility:
                test.visibility,

              passed: false,
            };
          }

          return runTest(
            document,
            test,
          );
        },
      ),
  );
}
