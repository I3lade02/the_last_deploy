export type GamePhase =
  | "menu"
  | "onboarding"
  | "intro"
  | "mission"
  | "missionComplete"
  | "actComplete"
  | "demoComplete";

export type MissionFileLanguage =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "plaintext";

export type SidebarView =
  | "ticket"
  | "files"
  | "docs"

export interface MissionFile {
  path: string;
  language: MissionFileLanguage;
  content: string;

  /**
   * File can be opened and inspected,
   * but cannot be modified by the player
   */
  readOnly?: boolean;
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
    }
  | {
    type: "elementCountAtLeast";
    selector: string;
    count: number;
    }
  | {
    type: "allFieldsHaveLabels";
    selector: string;
  }
  | {
    type: "formFieldAttribute";

    /**
     * At least one of these values must occur
     * inside the associated label
     * 
     * Matching is case insensitive
     */
    labelIncludes: string[];

    attribute: string;

    mode:
      | "exists"
      | "notBlank"
      | "equals";

    value?: string;
  }
  | {
    type: "headingOrderValid";
  }
  | {
    type: "internalLinksResolve";
    selector: string;
  }
  | {
    type: "textNotContains";
    selector: string;
    value: string;
  }
  | {
    type: "selectorsExist";
    selectors: string[];
  }
  | {
    type: "cssSelectorExists";
    selector: string;
  }
  | {
    type: "cssProperty";

    selector: string;
    property: string;

    mode:
      | "exists"
      | "notBlank"
      | "equals"
      | "contains";

    value?: string;
  };
export interface MissionTest {
  id: string;
  label: string;
  visibility: "visible" | "hidden";
  evaluate: EvaluationDefinition;

  /**
   * HTML file evaluated by this test
   * 
   * if omitted, mission.preview.entryFile
   * or the first HTML file is used
   */
  filePath?: string;
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

  assets?: MissionAsset[];

  /**
   * Start this mission from the workspace
   * produced by another completed mission
   */

  inheritWorkspaceFrom?: string;

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

export interface MissionAsset {
  /**
   * Path visible to the player insider the virtual project
   * 
   * example:
   * assets/logo.svg
   */
  path: string;

  /**
   * Actual path bundled with The Last Deploy
   * 
   * example:
   * /mission-assets/orbit/logo.svg
   */
  runtimePath: string;

  type: "image";
}

export interface DocumentationEntry {
  id: string;

  title: string;
  category: string;

  summary: string;

  syntax?: string;

  notes?: string[];

  keywords: string[];

  unlockAtMissionOrder: number;
}

