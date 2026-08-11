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

  completedMissionIds: string[];

  missionStats: Record<
    string,
    MissionStats
  >;

  startNewGame: () => void;

  createPlayer: (name: string) => void;

  startFirstMission: () => void;

  setActiveFile: (path: string) => void;

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

function createWorkspace(
  mission: Mission,
): Record<string, string> {
  return Object.fromEntries(
    mission.files.map((file) => [
      file.path,
      file.content,
    ]),
  );
}

function createMissionRuntime(
  mission: Mission,
) {
  return {
    currentMissionId: mission.id,

    workspace: createWorkspace(mission),

    activeFile:
      mission.files[0]?.path ?? null,

    testResults: [] as TestResult[],

    attempts: 0,
    hintsRevealed: 0,

    missionPassed: false,
  };
}

export const useGameStore =
  create<GameState>()(
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

        completedMissionIds: [],

        missionStats: {},

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

            completedMissionIds: [],

            missionStats: {},
          });
        },

        createPlayer: (name) => {
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

        startFirstMission: () => {
          const mission =
            getFirstMission();

          set({
            phase: "mission",

            ...createMissionRuntime(
              mission,
            ),
          });
        },

        setActiveFile: (path) => {
          const mission =
            getMissionById(
              get().currentMissionId,
            );

          if (!mission) {
            return;
          }

          const exists =
            mission.files.some(
              (file) =>
                file.path === path,
            );

          if (!exists) {
            return;
          }

          set({
            activeFile: path,
          });
        },

        updateFile: (
          path,
          content,
        ) => {
          set((state) => ({
            workspace: {
              ...state.workspace,
              [path]: content,
            },

            missionPassed: false,

            testResults: [],
          }));
        },

        runTests: () => {
          const state = get();

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
            results.length > 0 &&
            results.every(
              (result) =>
                result.passed,
            );

          set({
            testResults: results,

            attempts:
              state.attempts + 1,

            missionPassed:
              passed,
          });
        },

        revealHint: () => {
          const mission =
            getMissionById(
              get().currentMissionId,
            );

          if (!mission) {
            return;
          }

          set((state) => ({
            hintsRevealed:
              Math.min(
                state.hintsRevealed +
                  1,

                mission.hints.length,
              ),
          }));
        },

        resolveMission: () => {
          const state = get();

          if (
            !state.missionPassed ||
            !state.currentMissionId
          ) {
            return;
          }

          const missionId =
            state.currentMissionId;

          const completed =
            state.completedMissionIds.includes(
              missionId,
            )
              ? state.completedMissionIds
              : [
                  ...state.completedMissionIds,
                  missionId,
                ];

          set({
            phase:
              "missionComplete",

            completedMissionIds:
              completed,

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

        continueToNextMission:
          () => {
            const state = get();

            if (
              !state.currentMissionId
            ) {
              return;
            }

            const nextMission =
              getNextMission(
                state.currentMissionId,
              );

            if (!nextMission) {
              set({
                phase:
                  "demoComplete",
              });

              return;
            }

            set({
              phase: "mission",

              ...createMissionRuntime(
                nextMission,
              ),
            });
          },

        resetMission: () => {
          const mission =
            getMissionById(
              get().currentMissionId,
            );

          if (!mission) {
            return;
          }

          set(
            createMissionRuntime(
              mission,
            ),
          );
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

            completedMissionIds: [],

            missionStats: {},
          });
        },
      }),

      {
        name:
          "the-last-deploy-save-v2",
      },
    ),
  );