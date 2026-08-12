import {
  CheckCircle2,
  Code2,
  LockKeyhole,
  RotateCcw,
} from "lucide-react";

import { useGameStore } from "../store/use-game-store";

export function DemoCompleteScreen() {
  const playerName =
    useGameStore(
      (state) =>
        state.playerName,
    );

  const completedMissionIds =
    useGameStore(
      (state) =>
        state.completedMissionIds,
    );

  const missionStats =
    useGameStore(
      (state) =>
        state.missionStats,
    );

  const resetGame =
    useGameStore(
      (state) =>
        state.resetGame,
    );

  const stats =
    Object.values(
      missionStats,
    ).reduce(
      (
        result,
        mission,
      ) => ({
        attempts:
          result.attempts +
          mission.attempts,

        hints:
          result.hints +
          mission.hintsUsed,
      }),

      {
        attempts: 0,
        hints: 0,
      },
    );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080b10] px-6 py-12 text-zinc-100">
      <div className="w-full max-w-3xl">
        <div className="border border-emerald-400/20 bg-[#0d1118]">
          {/* Header */}
          <header className="border-b border-zinc-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 text-emerald-400" />

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                  Act I Complete
                </p>

                <h1 className="mt-1 text-xl font-semibold text-zinc-100">
                  Welcome to Nullbyte
                </h1>
              </div>
            </div>
          </header>

          {/* Employee summary */}
          <section className="grid gap-px bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Employee"
              value={
                playerName ||
                "Employee #047"
              }
            />

            <Stat
              label="Tickets"
              value={`${completedMissionIds.length}/12`}
            />

            <Stat
              label="Test Runs"
              value={String(
                stats.attempts,
              )}
            />

            <Stat
              label="Hints Used"
              value={String(
                stats.hints,
              )}
            />
          </section>

          {/* Maya */}
          <section className="border-b border-zinc-800 px-6 py-6">
            <MessageHeader
              initials="MC"
              name="Maya Chen"
              role="Project Manager"
            />

            <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              <p>
                That's your first
                week.
              </p>

              <p>
                Twelve tickets.
                No production
                outages.
              </p>

              <p>
                We have had worse
                starts.
              </p>
            </div>
          </section>

          {/* Elliot */}
          <section className="border-b border-zinc-800 bg-[#0a0e14] px-6 py-6">
            <MessageHeader
              initials="ER"
              name="Elliot Reed"
              role="Backend Developer"
            />

            <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              <p>
                Maya said you've
                been working on
                some of Daniel's
                old projects.
              </p>

              <p>
                If you find
                anything unusual
                in them...
              </p>

              <p className="text-zinc-200">
                don't delete it.
              </p>
            </div>
          </section>

          {/* Next act */}
          <section className="px-6 py-8">
            <div className="rounded-lg border border-violet-400/15 bg-violet-400/4 p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-violet-400/20 bg-violet-400/10">
                  <Code2 className="size-5 text-violet-300" />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-violet-400">
                    Next
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-zinc-200">
                    Act II
                  </h2>

                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
                    Everything Has a Style
                  </p>

                  <div className="mt-4 flex items-center gap-2 font-mono text-xs text-zinc-600">
                    <LockKeyhole className="size-3.5" />

                    styles.css
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-700">
                M0.4 Complete
              </p>

              <button
                type="button"
                onClick={
                  resetGame
                }
                className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition hover:border-zinc-700 hover:text-zinc-300"
              >
                <RotateCcw className="size-3.5" />

                Start Over
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#0b0f15] px-5 py-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700">
        {label}
      </p>

      <p className="mt-2 truncate font-mono text-sm text-zinc-300">
        {value}
      </p>
    </div>
  );
}

function MessageHeader({
  initials,
  name,
  role,
}: {
  initials: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded bg-zinc-800 font-mono text-[10px] font-semibold text-zinc-400">
        {initials}
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-300">
          {name}
        </p>

        <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-700">
          {role}
        </p>
      </div>
    </div>
  );
}