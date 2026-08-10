import { Monitor } from "lucide-react";

import { useGameStore } from "../../store/use-game-store";

export function PreviewPanel() {
  const html = useGameStore(
    (state) => state.workspace["index.html"] ?? "",
  );

  return (
    <section className="flex min-h-0 flex-col border-l border-zinc-800 bg-[#0c0f15]">
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-zinc-800 px-4">
        <div className="flex items-center gap-2">
          <Monitor className="size-3.5 text-zinc-500" />

          <span className="font-mono text-[10px] tracking-widest text-zinc-500">
            LIVE PREVIEW
          </span>
        </div>

        <span className="font-mono text-[9px] text-zinc-700">
          DESKTOP
        </span>
      </header>

      <div className="min-h-0 flex-1 bg-zinc-950 p-4">
        <div className="h-full overflow-hidden rounded-lg border border-zinc-800 bg-white shadow-2xl">
          <div className="flex h-8 items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3">
            <div className="size-2 rounded-full bg-red-400" />
            <div className="size-2 rounded-full bg-amber-400" />
            <div className="size-2 rounded-full bg-emerald-400" />

            <div className="ml-3 flex-1 rounded bg-white px-3 py-1 font-mono text-[8px] text-zinc-400">
              greenbean.local
            </div>
          </div>

          <iframe
            title="Mission preview"
            srcDoc={html}
            sandbox=""
            className="h-[calc(100%-2rem)] w-full bg-white"
          />
        </div>
      </div>
    </section>
  );
}