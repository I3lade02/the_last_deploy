import { create } from "zustand";
import { persist } from "zustand/middleware";

import { evaluateMission } from "../game/evaluator/evaluate-mission";
import { mission001 } from "../game/missions/mission-001";

import type {
  GamePhase,
  TestResult,
} from "../types/game";

interface GameState {
  phase: GamePhase;

  playerName: string;

  currentMissionId: string | null;

  workspace: Record<string, string>;
  activeFile: string | null;

  testResults: TestResult[];

  attempts: number;
  hintsRevealed: number;

  missionPassed: boolean;

  startNewGame: () => void;

  createPlayer: (name: string) => void;

  startFirstMission: () => void;

  setActiveFile: (path: string) => void;

  updateFile: (path: string, content: string) => void;

  runTests: () => void;

  revealHint: () => void;

  resolveMission: () => void;

  resetMission: () => void;

  resetGame: () => void;
}

function createInitialWorkspace(): Record<string, string> {
  return Object.fromEntries(
    mission001.files.map((file) => [file.path, file.content]),
  );
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: "menu",

      playerName: "",

      currentMissionId: null,

      workspace: {},
      activeFile: null,

      testResults: [],

      attempts: 0,
      hintsRevealed: 0,

      missionPassed: false,

      startNewGame: () => {
        set({
          phase: "onboarding",

          playerName: "",

          currentMissionId: null,

          workspace: {},
          activeFile: null,

          testResults: [],

          attempts: 0,
          hintsRevealed: 0,

          missionPassed: false,
        });
      },

      createPlayer: (name) => {
        const trimmedName = name.trim();

        if (!trimmedName) {
          return;
        }

        set({
          playerName: trimmedName,
          phase: "intro",
        });
      },

      startFirstMission: () => {
        set({
          phase: "mission",

          currentMissionId: mission001.id,

          workspace: createInitialWorkspace(),
          activeFile: mission001.files[0]?.path ?? null,

          testResults: [],

          attempts: 0,
          hintsRevealed: 0,

          missionPassed: false,
        });
      },

      setActiveFile: (path) => {
        set({
          activeFile: path,
        });
      },

      updateFile: (path, content) => {
        set((state) => ({
          workspace: {
            ...state.workspace,
            [path]: content,
          },

          missionPassed: false,
        }));
      },

      runTests: () => {
        const workspace = get().workspace;

        const results = evaluateMission(mission001, workspace);

        const passed =
          results.length > 0 &&
          results.every((result) => result.passed);

        set((state) => ({
          testResults: results,
          attempts: state.attempts + 1,
          missionPassed: passed,
        }));
      },

      revealHint: () => {
        set((state) => ({
          hintsRevealed: Math.min(
            state.hintsRevealed + 1,
            mission001.hints.length,
          ),
        }));
      },

      resolveMission: () => {
        if (!get().missionPassed) {
          return;
        }

        set({
          phase: "complete",
        });
      },

      resetMission: () => {
        set({
          workspace: createInitialWorkspace(),
          activeFile: mission001.files[0]?.path ?? null,

          testResults: [],

          attempts: 0,
          hintsRevealed: 0,

          missionPassed: false,
        });
      },

      resetGame: () => {
        set({
          phase: "menu",

          playerName: "",

          currentMissionId: null,

          workspace: {},
          activeFile: null,

          testResults: [],

          attempts: 0,
          hintsRevealed: 0,

          missionPassed: false,
        });
      },
    }),
    {
      name: "the-last-deploy-save",
    },
  ),
);