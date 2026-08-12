import { create } from "zustand";
import { persist } from "zustand/middleware";

import { evaluateMission } from "../game/evaluator/evaluate-mission";

import {
  getFirstMission,
  getMissionById,
  getNextMission,
} from "../game/missions";

import type {
  GamePhase,
  Mission,
  MissionStats,
  SidebarView,
  TestResult,
} from "../types/game";

interface GameState {
  phase: GamePhase;

  playerName: string;

  currentMissionId: string | null;

  workspace: Record<string, string>;
  activeFile: string | null;

  sidebarView: SidebarView;

  testResults: TestResult[];

  attempts: number;
  hintsRevealed: number;

  missionPassed: boolean;

  completedMissionIds: string[];

  /**
   * Stores the final player workspace for completed missions.
   *
   * This allows later missions to continue directly from
   * the player's own previous solution.
   *
   * Example:
   *
   * Mission #006
   *     ↓
   * player modifies index.html
   *     ↓
   * mission resolved
   *     ↓
   * completedWorkspaces["html-006"]
   *     ↓
   * Mission #007 inherits it
   */
  completedWorkspaces: Record<
    string,
    Record<string, string>
  >;

  missionStats: Record<
    string,
    MissionStats
  >;

  startNewGame: () => void;

  createPlayer: (
    name: string,
  ) => void;

  startFirstMission: () => void;

  setActiveFile: (
    path: string,
  ) => void;

  setSidebarView: (
    view: SidebarView,
  ) => void;

  updateFile: (
    path: string,
    content: string,
  ) => void;

  runTests: () => void;

  revealHint: () => void;

  resolveMission: () => void;

  continueToNextMission: () => void;

  resetMission: () => void;

  resetGame: () => void;
}

/**
 * Creates the initial workspace for a mission.
 *
 * Normally this simply uses the mission's starter files.
 *
 * If the mission inherits from a previous mission,
 * the player's completed workspace is merged into
 * the new mission.
 */
function createWorkspace(
  mission: Mission,

  completedWorkspaces: Record<
    string,
    Record<string, string>
  >,
): Record<string, string> {
  const workspace =
    Object.fromEntries(
      mission.files.map(
        (file) => [
          file.path,
          file.content,
        ],
      ),
    );

  /**
   * Normal standalone mission.
   */
  if (
    !mission.inheritWorkspaceFrom
  ) {
    return workspace;
  }

  const inheritedWorkspace =
    completedWorkspaces[
      mission.inheritWorkspaceFrom
    ];

  /**
   * This could happen when jumping directly
   * into a mission during development.
   *
   * In that case we simply use the fallback
   * starter files defined by the mission.
   */
  if (!inheritedWorkspace) {
    return workspace;
  }

  /**
   * Only inherit files which actually belong
   * to the new mission.
   *
   * This prevents obsolete files from a previous
   * mission leaking into another workspace.
   */
  const allowedPaths =
    new Set(
      mission.files.map(
        (file) => file.path,
      ),
    );

  for (const [
    path,
    content,
  ] of Object.entries(
    inheritedWorkspace,
  )) {
    if (
      allowedPaths.has(path)
    ) {
      workspace[path] =
        content;
    }
  }

  return workspace;
}

/**
 * Creates all temporary runtime state
 * required when entering a mission.
 */
function createMissionRuntime(
  mission: Mission,

  completedWorkspaces: Record<
    string,
    Record<string, string>
  >,
) {
  return {
    currentMissionId:
      mission.id,

    workspace:
      createWorkspace(
        mission,
        completedWorkspaces,
      ),

    activeFile:
      mission.files[0]
        ?.path ?? null,

    sidebarView:
      "ticket" as SidebarView,

    testResults:
      [] as TestResult[],

    attempts: 0,

    hintsRevealed: 0,

    missionPassed: false,
  };
}

export const useGameStore =
  create<GameState>()(
    persist(
      (set, get) => ({
        /**
         * ------------------------------------------------
         * INITIAL STATE
         * ------------------------------------------------
         */

        phase: "menu",

        playerName: "",

        currentMissionId: null,

        workspace: {},

        activeFile: null,

        sidebarView: "ticket",

        testResults: [],

        attempts: 0,

        hintsRevealed: 0,

        missionPassed: false,

        completedMissionIds: [],

        completedWorkspaces: {},

        missionStats: {},

        /**
         * ------------------------------------------------
         * NEW GAME
         * ------------------------------------------------
         */

        startNewGame: () => {
          set({
            phase: "onboarding",

            playerName: "",

            currentMissionId:
              null,

            workspace: {},

            activeFile: null,

            sidebarView:
              "ticket",

            testResults: [],

            attempts: 0,

            hintsRevealed: 0,

            missionPassed:
              false,

            completedMissionIds:
              [],

            completedWorkspaces:
              {},

            missionStats: {},
          });
        },

        /**
         * ------------------------------------------------
         * PLAYER PROFILE
         * ------------------------------------------------
         */

        createPlayer: (
          name,
        ) => {
          const trimmedName =
            name.trim();

          if (!trimmedName) {
            return;
          }

          set({
            playerName:
              trimmedName,

            phase: "intro",
          });
        },

        /**
         * ------------------------------------------------
         * FIRST MISSION
         * ------------------------------------------------
         */

        startFirstMission:
          () => {
            const mission =
              getFirstMission();

            const state =
              get();

            set({
              phase:
                "mission",

              ...createMissionRuntime(
                mission,
                state.completedWorkspaces,
              ),
            });
          },

        /**
         * ------------------------------------------------
         * WORKSTATION
         * ------------------------------------------------
         */

        setActiveFile: (
          path,
        ) => {
          const mission =
            getMissionById(
              get()
                .currentMissionId,
            );

          if (!mission) {
            return;
          }

          const fileExists =
            mission.files.some(
              (file) =>
                file.path ===
                path,
            );

          /**
           * Assets are not editable files.
           *
           * This also prevents arbitrary paths
           * from becoming the active editor model.
           */
          if (!fileExists) {
            return;
          }

          set({
            activeFile: path,
          });
        },

        setSidebarView: (
          view,
        ) => {
          set({
            sidebarView:
              view,
          });
        },

        updateFile: (
          path,
          content,
        ) => {
          const state =
            get();

          const mission =
            getMissionById(
              state.currentMissionId,
            );

          if (!mission) {
            return;
          }

          /**
           * Only editable mission files can be changed.
           */
          const editable =
            mission.files.some(
              (file) =>
                file.path === path &&
                !file.readOnly,
            );

          if (!editable) {
            return;
          }

          set({
            workspace: {
              ...state.workspace,

              [path]:
                content,
            },

            /**
             * Any code modification invalidates the
             * previous test result.
             */
            missionPassed:
              false,

            testResults: [],
          });
        },

        /**
         * ------------------------------------------------
         * TESTS
         * ------------------------------------------------
         */

        runTests: () => {
          const state =
            get();

          const mission =
            getMissionById(
              state.currentMissionId,
            );

          if (!mission) {
            return;
          }

          const results =
            evaluateMission(
              mission,
              state.workspace,
            );

          const passed =
            results.length >
              0 &&
            results.every(
              (result) =>
                result.passed,
            );

          set({
            testResults:
              results,

            attempts:
              state.attempts +
              1,

            missionPassed:
              passed,
          });
        },

        /**
         * ------------------------------------------------
         * HINTS
         * ------------------------------------------------
         */

        revealHint: () => {
          const state =
            get();

          const mission =
            getMissionById(
              state.currentMissionId,
            );

          if (!mission) {
            return;
          }

          set({
            hintsRevealed:
              Math.min(
                state.hintsRevealed +
                  1,

                mission.hints
                  .length,
              ),
          });
        },

        /**
         * ------------------------------------------------
         * COMPLETE CURRENT MISSION
         * ------------------------------------------------
         */

        resolveMission: () => {
          const state =
            get();

          if (
            !state.missionPassed ||
            !state.currentMissionId
          ) {
            return;
          }

          const missionId =
            state.currentMissionId;

          const alreadyCompleted =
            state.completedMissionIds.includes(
              missionId,
            );

          const completedMissionIds =
            alreadyCompleted
              ? state.completedMissionIds
              : [
                  ...state.completedMissionIds,
                  missionId,
                ];

          set({
            phase:
              "missionComplete",

            completedMissionIds,

            /**
             * Save exactly what the player wrote.
             *
             * The next mission can then inherit
             * this workspace.
             */
            completedWorkspaces: {
              ...state.completedWorkspaces,

              [missionId]: {
                ...state.workspace,
              },
            },

            missionStats: {
              ...state.missionStats,

              [missionId]: {
                attempts:
                  state.attempts,

                hintsUsed:
                  state.hintsRevealed,
              },
            },
          });
        },

        /**
         * ------------------------------------------------
         * CONTINUE CAMPAIGN
         * ------------------------------------------------
         */

        continueToNextMission:
          () => {
            const state =
              get();

            if (
              !state.currentMissionId
            ) {
              return;
            }

            const nextMission =
              getNextMission(
                state.currentMissionId,
              );

            /**
             * No more missions currently registered.
             */
            if (!nextMission) {
              set({
                phase:
                  "demoComplete",
              });

              return;
            }

            set({
              phase:
                "mission",

              ...createMissionRuntime(
                nextMission,
                state.completedWorkspaces,
              ),
            });
          },

        /**
         * ------------------------------------------------
         * RESET CURRENT MISSION
         * ------------------------------------------------
         */

        resetMission: () => {
          const state =
            get();

          const mission =
            getMissionById(
              state.currentMissionId,
            );

          if (!mission) {
            return;
          }

          set(
            createMissionRuntime(
              mission,
              state.completedWorkspaces,
            ),
          );
        },

        /**
         * ------------------------------------------------
         * RESET ENTIRE GAME
         * ------------------------------------------------
         */

        resetGame: () => {
          set({
            phase: "menu",

            playerName: "",

            currentMissionId:
              null,

            workspace: {},

            activeFile: null,

            sidebarView:
              "ticket",

            testResults: [],

            attempts: 0,

            hintsRevealed: 0,

            missionPassed:
              false,

            completedMissionIds:
              [],

            completedWorkspaces:
              {},

            missionStats: {},
          });
        },
      }),

      {
        /**
         * New save version for M0.3.
         *
         * We intentionally do not reuse the previous
         * development save because the state schema
         * changed significantly.
         */
        name:
          "the-last-deploy-save-v3",
      },
    ),
  );