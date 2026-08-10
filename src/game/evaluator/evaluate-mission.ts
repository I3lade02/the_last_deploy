import type {
  EvaluationDefinition,
  Mission,
  MissionTest,
  TestResult,
} from "../../types/game";

function normalizeText(value: string | null): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function evaluateDefinition(
  document: Document,
  definition: EvaluationDefinition,
): boolean {
  switch (definition.type) {
    case "elementExists": {
      return document.querySelector(definition.selector) !== null;
    }

    case "elementCount": {
      return (
        document.querySelectorAll(definition.selector).length === definition.count
      );
    }

    case "textContains": {
      const element = document.querySelector(definition.selector);

      if (!element) {
        return false;
      }

      return normalizeText(element.textContent).includes(
        normalizeText(definition.value),
      );
    }

    case "attributeEquals": {
      const element = document.querySelector(definition.selector);

      if (!element) {
        return false;
      }

      return element.getAttribute(definition.attribute) === definition.value;
    }

    default: {
      return false;
    }
  }
}

function runTest(document: Document, test: MissionTest): TestResult {
  return {
    testId: test.id,
    label: test.label,
    visibility: test.visibility,
    passed: evaluateDefinition(document, test.evaluate),
  };
}

export function evaluateMission(
  mission: Mission,
  workspace: Record<string, string>,
): TestResult[] {
  const html = workspace["index.html"];

  if (!html) {
    return [];
  }

  const parser = new DOMParser();

  const document = parser.parseFromString(html, "text/html");

  return mission.testGroups.flatMap((group) =>
    group.tests.map((test) => runTest(document, test)),
  );
}