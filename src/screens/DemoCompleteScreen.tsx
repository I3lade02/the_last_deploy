import {
  ArrowRight,
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

  const continueToNextAct =
    useGameStore(
      (state) =>
        state.continueToNextAct,
    );

  const resetGame =
    useGameStore(
      (state) =>
        state.resetGame,
    );

  /**
   * ------------------------------------------------
   * ACT STATISTICS
   * ------------------------------------------------
   */

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
      <div className="w-full max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-emerald-400/20 bg-[#0d1118] shadow-2xl shadow-black/40">
          {/* ------------------------------------------------ */}
          {/* ACT COMPLETE HEADER */}
          {/* ------------------------------------------------ */}

          <header className="border-b border-zinc-800 px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10">
                <CheckCircle2 className="size-5 text-emerald-400" />
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                  Act I Complete
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-zinc-100">
                  Welcome to Nullbyte
                </h1>

                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                  Week One Report
                </p>
              </div>
            </div>
          </header>

          {/* ------------------------------------------------ */}
          {/* STATISTICS */}
          {/* ------------------------------------------------ */}

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

          {/* ------------------------------------------------ */}
          {/* MAYA MESSAGE */}
          {/* ------------------------------------------------ */}

          <section className="border-b border-zinc-800 px-6 py-7">
            <MessageHeader
              initials="MC"
              name="Maya Chen"
              role="Project Manager"
            />

            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-zinc-400">
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

          {/* ------------------------------------------------ */}
          {/* ELLIOT MESSAGE */}
          {/* ------------------------------------------------ */}

          <section className="border-b border-zinc-800 bg-[#0a0e14] px-6 py-7">
            <MessageHeader
              initials="ER"
              name="Elliot Reed"
              role="Backend Developer"
            />

            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-zinc-400">
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

          {/* ------------------------------------------------ */}
          {/* NEXT ACT */}
          {/* ------------------------------------------------ */}

          <section className="px-6 py-8">
            <div className="rounded-xl border border-violet-400/15 bg-violet-400/4 p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-400/10">
                    <Code2 className="size-5 text-violet-300" />
                  </div>

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-violet-400">
                      Next Act
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-zinc-200">
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

                <button
                  type="button"
                  onClick={
                    continueToNextAct
                  }
                  className="group flex shrink-0 items-center justify-center gap-2 rounded-md border border-violet-400/30 bg-violet-400/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-400/15 hover:text-violet-100"
                >
                  Begin Act II

                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* FOOTER ACTIONS */}
            {/* ------------------------------------------------ */}

            <div className="mt-8 flex flex-col gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-700">
                  Development Milestone
                </p>

                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  M0.4 Complete
                </p>
              </div>

              <button
                type="button"
                onClick={
                  resetGame
                }
                className="flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition hover:border-zinc-700 hover:bg-zinc-900/70 hover:text-zinc-300"
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

/**
 * ------------------------------------------------
 * STAT
 * ------------------------------------------------
 */

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 bg-[#0b0f15] px-5 py-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700">
        {label}
      </p>

      <p className="mt-2 truncate font-mono text-sm text-zinc-300">
        {value}
      </p>
    </div>
  );
}

/**
 * ------------------------------------------------
 * MESSAGE HEADER
 * ------------------------------------------------
 */

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
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 font-mono text-[10px] font-semibold text-zinc-400">
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