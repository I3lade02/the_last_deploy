import {
  CheckCircle2,
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

  const resetGame =
    useGameStore(
      (state) =>
        state.resetGame,
    );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b10] p-6">
      <section className="w-full max-w-xl rounded-xl border border-emerald-400/20 bg-[#0d1016] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-emerald-400/10">
          <CheckCircle2 className="size-7 text-emerald-400" />
        </div>

        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">
          DEVELOPMENT BUILD
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-white">
          First five tickets complete.
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-500">
          Not bad for your first
          few hours at Nullbyte,{" "}
          {playerName}.
        </p>

        <div className="mt-8 rounded-lg border border-zinc-800 bg-[#090b10] p-5 font-mono text-xs leading-7 text-zinc-500">
          <p>
            Tickets resolved:{" "}
            {
              completedMissionIds.length
            }
          </p>

          <p>
            Production outages:
            0
          </p>

          <p>
            Missing senior
            developers: 1
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-violet-400/10 bg-violet-400/5 p-4 text-left">
          <p className="font-mono text-[10px] tracking-widest text-violet-300">
            MAYA CHEN
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            I've got something
            slightly bigger.
          </p>
        </div>

        <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-zinc-700">
          M0.2 COMPLETE
        </p>

        <button
          type="button"
          onClick={resetGame}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2 font-mono text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-white"
        >
          <RotateCcw className="size-3.5" />

          RETURN TO MENU
        </button>
      </section>
    </main>
  );
}