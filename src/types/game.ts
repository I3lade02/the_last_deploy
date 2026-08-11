export type GamePhase =
  | "menu"
  | "onboarding"
  | "intro"
  | "mission"
  | "missionComplete"
  | "demoComplete";

export type MissionFileLanguage =
  | "html"
  | "css"
  | "javascript"
  | "typescript";

export interface MissionFile {
  path: string;
  language: MissionFileLanguage;
  content: string;
}

export interface MissionObjective {
  id: string;
  label: string;
  required: boolean;

  /**
   * Tests that have to pass before we consider
   * this objective visually completed.
   */
  testIds?: string[];
}

export type EvaluationDefinition =
  | {
      type: "elementExists";
      selector: string;
    }
  | {
      type: "elementCount";
      selector: string;
      count: number;
    }
  | {
      type: "textContains";
      selector: string;
      value: string;
    }
  | {
      type: "elementsContainTexts";
      selector: string;
      values: string[];
    }
  | {
      type: "attributeExists";
      selector: string;
      attribute: string;
    }
  | {
      type: "attributeNotBlank";
      selector: string;
      attribute: string;
    }
  | {
      type: "attributeEquals";
      selector: string;
      attribute: string;
      value: string;
    };

export interface MissionTest {
  id: string;
  label: string;
  visibility: "visible" | "hidden";
  evaluate: EvaluationDefinition;
}

export interface MissionTestGroup {
  id: string;
  label: string;
  tests: MissionTest[];
}

export interface MissionHint {
  id: string;
  content: string;
  code?: string;
}

export interface MissionBriefing {
  ticketNumber: string;
  client: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  title: string;
  description: string;
}

export interface MissionMessage {
  sender: string;
  role: string;
  initials: string;
  content: string;
}

export interface MissionPreview {
  entryFile?: string;

  /**
   * Optional virtual root used by srcDoc.
   *
   * Example:
   * /mission-assets/orbit/
   */
  baseHref?: string;
}

export interface Mission {
  id: string;

  act: number;
  order: number;

  title: string;

  briefing: MissionBriefing;

  files: MissionFile[];

  objectives: MissionObjective[];

  testGroups: MissionTestGroup[];

  hints: MissionHint[];

  preview?: MissionPreview;

  completionMessages?: MissionMessage[];
}

export interface TestResult {
  testId: string;
  label: string;
  visibility: "visible" | "hidden";
  passed: boolean;
}

export interface MissionStats {
  attempts: number;
  hintsUsed: number;
}