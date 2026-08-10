import { Circle, LockKeyhole } from "lucide-react";

import { useGameStore } from "../../store/use-game-store";

export function TopBar() {
  const playerName = useGameStore((state) => state.playerName);

  return (
    <header className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-800 bg-[#0b0e13] px-4">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400">
          NULLBYTE
        </span>

        <span className="h-4 w-px bg-zinc-800" />

        <span className="font-mono text-[10px] text-zinc-600">
          WORKSTATION / DEV-047
        </span>
      </div>

      <div className="flex items-center gap-5 font-mono text-[10px]">
        <div className="flex items-center gap-2 text-zinc-500">
          <Circle className="size-2 fill-emerald-400 text-emerald-400" />
          ONLINE
        </div>

        <div className="flex items-center gap-2 text-amber-400">
          <LockKeyhole className="size-3" />
          ACCESS LVL 1
        </div>

        <div className="text-zinc-400">
          {playerName} / #047
        </div>
      </div>
    </header>
  );
}