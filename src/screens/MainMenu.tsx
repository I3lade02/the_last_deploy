import { Code2, Play } from "lucide-react";

import { useGameStore } from "../store/use-game-store";

export function MainMenu() {
  const startNewGame = useGameStore((state) => state.startNewGame);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b10]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[32px_32px]" />

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center px-8 text-center">
        <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/5">
          <Code2 className="size-8 text-emerald-400" />
        </div>

        <p className="mb-3 font-mono text-xs tracking-[0.35em] text-emerald-400">
          NULLBYTE SOLUTIONS
        </p>

        <h1 className="text-6xl font-black tracking-[-0.06em] text-white">
          THE LAST
          <span className="block text-zinc-500">DEPLOY</span>
        </h1>

        <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
          Your first day as a web developer.
          <br />
          What could possibly go wrong?
        </p>

        <button
          type="button"
          onClick={startNewGame}
          className="mt-10 flex items-center gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400 px-6 py-3 font-mono text-sm font-bold text-[#07100b] transition hover:bg-emerald-300"
        >
          <Play className="size-4 fill-current" />
          NEW GAME
        </button>

        <p className="mt-10 font-mono text-[10px] tracking-widest text-zinc-700">
          BUILD M0.2
        </p>
      </section>
    </main>
  );
}