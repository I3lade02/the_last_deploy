import { CheckCircle2, RotateCcw } from "lucide-react";

import { useGameStore } from "../store/use-game-store";

export function CompletionScreen() {
  const playerName = useGameStore((state) => state.playerName);
  const attempts = useGameStore((state) => state.attempts);
  const hintsRevealed = useGameStore(
    (state) => state.hintsRevealed,
  );

  const resetGame = useGameStore((state) => state.resetGame);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b10] p-6">
      <section className="w-full max-w-xl rounded-xl border border-emerald-400/20 bg-[#0d1016] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-emerald-400/10">
          <CheckCircle2 className="size-7 text-emerald-400" />
        </div>

        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-emerald-400">
          TICKET RESOLVED
        </p>

        <h1 className="text-3xl font-semibold text-white">
          Nice work, {playerName}.
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          You have officially modified production code.
          <br />
          Try not to think about that too much.
        </p>

        <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-lg border border-zinc-800">
          <Stat label="Attempts" value={attempts} />
          <Stat label="Hints used" value={hintsRevealed} />
        </div>

        <div className="mt-8 rounded-lg border border-zinc-800 bg-[#090b10] p-4 font-mono text-xs leading-6 text-zinc-500">
          <p className="text-zinc-300">
            M0.1 PLAYABLE COMPLETE
          </p>

          <p>1 ticket resolved</p>
          <p>0 production outages</p>
        </div>

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