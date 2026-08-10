import {
  CheckCircle2,
  Circle,
  Play,
  XCircle,
} from "lucide-react";

import { useGameStore } from "../../store/use-game-store";

export function TestPanel() {
  const testResults = useGameStore(
    (state) => state.testResults,
  );

  const attempts = useGameStore((state) => state.attempts);

  const missionPassed = useGameStore(
    (state) => state.missionPassed,
  );

  const runTests = useGameStore((state) => state.runTests);
  const resolveMission = useGameStore(
    (state) => state.resolveMission,
  );

  const visibleResults = testResults.filter(
    (result) => result.visibility === "visible",
  );

  const hiddenFailure = testResults.some(
    (result) =>
      result.visibility === "hidden" && !result.passed,
  );

  return (
    <section className="flex min-h-40 shrink-0 border-t border-zinc-800 bg-[#090c11]">
      <div className="min-w-0 flex-1 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
            CLIENT ACCEPTANCE TESTS
          </p>

          <span className="font-mono text-[9px] text-zinc-700">
            ATTEMPTS: {attempts}
          </span>
        </div>

        {testResults.length === 0 ? (
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-700">
            <Circle className="size-3" />
            Tests have not been run yet.
          </div>
        ) : (
          <div className="space-y-2">
            {visibleResults.map((result) => (
              <div
                key={result.testId}
                className="flex items-center gap-2 font-mono text-xs"
              >
                {result.passed ? (
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="size-3.5 text-red-400" />
                )}

                <span
                  className={
                    result.passed
                      ? "text-zinc-400"
                      : "text-red-300"
                  }
                >
                  {result.label}
                </span>
              </div>
            ))}

            {hiddenFailure && (
              <div className="flex items-center gap-2 font-mono text-xs text-amber-300">
                <XCircle className="size-3.5" />
                Additional page validation failed.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex w-52 shrink-0 flex-col justify-center gap-2 border-l border-zinc-800 p-4">
        <button
          type="button"
          onClick={runTests}
          className="flex items-center justify-center gap-2 rounded-md bg-zinc-100 px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 transition hover:bg-white"
        >
          <Play className="size-3.5 fill-current" />
          RUN TESTS
        </button>

        {missionPassed && (
          <button
            type="button"
            onClick={resolveMission}
            className="flex items-center justify-center gap-2 rounded-md bg-emerald-400 px-4 py-2.5 font-mono text-xs font-bold text-[#06110b] transition hover:bg-emerald-300"
          >
            <CheckCircle2 className="size-3.5" />
            RESOLVE TICKET
          </button>
        )}
      </div>
    </section>
  );
}