import {
  CheckCircle2,
  Circle,
  Lightbulb,
  RotateCcw,
} from "lucide-react";

import { useCurrentMission } from "../../game/hooks/use-current-mission";

import { useGameStore } from "../../store/use-game-store";

export function TicketPanel() {
  const mission =
    useCurrentMission();

  const hintsRevealed =
    useGameStore(
      (state) =>
        state.hintsRevealed,
    );

  const testResults =
    useGameStore(
      (state) =>
        state.testResults,
    );

  const revealHint =
    useGameStore(
      (state) =>
        state.revealHint,
    );

  const resetMission =
    useGameStore(
      (state) =>
        state.resetMission,
    );

  if (!mission) {
    return null;
  }

  function isObjectivePassed(
    testIds?: string[],
  ) {
    if (
      !testIds ||
      testIds.length === 0
    ) {
      return false;
    }

    return testIds.every(
      (testId) =>
        testResults.some(
          (result) =>
            result.testId ===
              testId &&
            result.passed,
        ),
    );
  }

  return (
    <aside className="flex min-h-0 flex-col border-r border-zinc-800 bg-[#0c0f15]">
      <div className="border-b border-zinc-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
            TICKET{" "}
            {
              mission
                .briefing
                .ticketNumber
            }
          </span>

          <span className="rounded bg-red-400/10 px-2 py-1 font-mono text-[9px] font-semibold tracking-wider text-red-300">
            {mission.briefing.priority.toUpperCase()}
          </span>
        </div>

        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
          {
            mission.briefing
              .client
          }
        </p>

        <h2 className="text-lg font-semibold text-zinc-100">
          {
            mission.briefing
              .title
          }
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          {
            mission.briefing
              .description
          }
        </p>
      </div>

      <div className="border-b border-zinc-800 p-5">
        <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
          REQUIREMENTS
        </p>

        <div className="space-y-3">
          {mission.objectives.map(
            (objective) => {
              const passed =
                isObjectivePassed(
                  objective.testIds,
                );

              return (
                <div
                  key={
                    objective.id
                  }
                  className="flex items-start gap-3 text-sm text-zinc-400"
                >
                  {passed ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-zinc-700" />
                  )}

                  <span
                    className={
                      passed
                        ? "text-zinc-300"
                        : undefined
                    }
                  >
                    {
                      objective.label
                    }
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
            HINTS
          </p>

          <span className="font-mono text-[10px] text-zinc-700">
            {hintsRevealed}/
            {
              mission.hints
                .length
            }
          </span>
        </div>

        {hintsRevealed ===
          0 && (
          <p className="text-xs leading-5 text-zinc-700">
            Stuck? Hints become
            progressively more
            specific.
          </p>
        )}

        <div className="space-y-3">
          {mission.hints
            .slice(
              0,
              hintsRevealed,
            )
            .map(
              (
                hint,
                index,
              ) => (
                <div
                  key={
                    hint.id
                  }
                  className="rounded-lg border border-zinc-800 bg-[#10141b] p-3"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle2 className="size-3 text-amber-400" />

                    <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400">
                      Hint{" "}
                      {index +
                        1}
                    </span>
                  </div>

                  <p className="text-xs leading-5 text-zinc-400">
                    {
                      hint.content
                    }
                  </p>

                  {hint.code && (
                    <pre className="mt-3 overflow-x-auto rounded bg-black/30 p-3 font-mono text-xs text-emerald-300">
                      {
                        hint.code
                      }
                    </pre>
                  )}
                </div>
              ),
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-zinc-800 p-3">
        <button
          type="button"
          disabled={
            hintsRevealed >=
            mission.hints
              .length
          }
          onClick={
            revealHint
          }
          className="flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-[10px] text-zinc-400 transition hover:border-amber-400/30 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Lightbulb className="size-3" />
          HINT
        </button>

        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Reset this project? Your current code will be lost.",
              )
            ) {
              resetMission();
            }
          }}
          className="flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-[10px] text-zinc-400 transition hover:border-red-400/30 hover:text-red-300"
        >
          <RotateCcw className="size-3" />
          RESET
        </button>
      </div>
    </aside>
  );
}