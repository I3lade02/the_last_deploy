import {
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import { useCurrentMission } from "../game/hooks/use-current-mission";

import { getNextMission } from "../game/missions";

import { useGameStore } from "../store/use-game-store";

export function CompletionScreen() {
  const mission =
    useCurrentMission();

  const playerName =
    useGameStore(
      (state) =>
        state.playerName,
    );

  const attempts =
    useGameStore(
      (state) =>
        state.attempts,
    );

  const hintsRevealed =
    useGameStore(
      (state) =>
        state.hintsRevealed,
    );

  const continueToNextMission =
    useGameStore(
      (state) =>
        state.continueToNextMission,
    );

  if (!mission) {
    return null;
  }

  const nextMission =
    getNextMission(
      mission.id,
    );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b10] p-6">
      <section className="w-full max-w-2xl rounded-xl border border-emerald-400/20 bg-[#0d1016] p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-emerald-400/10">
            <CheckCircle2 className="size-7 text-emerald-400" />
          </div>

          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-emerald-400">
            TICKET{" "}
            {
              mission.briefing
                .ticketNumber
            }{" "}
            RESOLVED
          </p>

          <h1 className="text-3xl font-semibold text-white">
            Nice work,{" "}
            {playerName}.
          </h1>

          <p className="mt-2 text-sm text-zinc-600">
            {mission.title}
          </p>

          <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-lg border border-zinc-800">
            <Stat
              label="Attempts"
              value={attempts}
            />

            <Stat
              label="Hints used"
              value={
                hintsRevealed
              }
            />
          </div>
        </div>

        {mission
          .completionMessages
          ?.length ? (
          <div className="mt-8 space-y-4 border-t border-zinc-800 pt-7">
            {mission.completionMessages.map(
              (
                message,
                index,
              ) => (
                <div
                  key={`${message.sender}-${index}`}
                  className="flex gap-3"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-300">
                    {
                      message.initials
                    }
                  </div>

                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-200">
                        {
                          message.sender
                        }
                      </span>

                      <span className="font-mono text-[10px] text-zinc-700">
                        {
                          message.role
                        }
                      </span>
                    </div>

                    <div className="rounded-r-lg rounded-bl-lg border border-zinc-800 bg-[#11151d] px-4 py-3 text-sm leading-6 text-zinc-300">
                      {
                        message.content
                      }
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : null}

        <button
          type="button"
          onClick={
            continueToNextMission
          }
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 font-mono text-xs font-bold text-[#06110b] transition hover:bg-emerald-300"
        >
          {nextMission
            ? `OPEN TICKET ${nextMission.briefing.ticketNumber}`
            : "FINISH DEVELOPMENT BUILD"}

          <ChevronRight className="size-4" />
        </button>
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border-r border-zinc-800 p-4 last:border-r-0">
      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold text-zinc-200">
        {value}
      </p>
    </div>
  );
}