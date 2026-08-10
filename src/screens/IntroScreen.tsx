import { ChevronRight, MessageSquare } from "lucide-react";

import { useGameStore } from "../store/use-game-store";

export function IntroScreen() {
  const playerName = useGameStore((state) => state.playerName);
  const startFirstMission = useGameStore(
    (state) => state.startFirstMission,
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b10] p-6">
      <section className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1016]">
        <header className="flex items-center gap-3 border-b border-zinc-800 px-5 py-4">
          <MessageSquare className="size-4 text-emerald-400" />

          <div>
            <p className="text-sm font-semibold text-white">
              Company Chat
            </p>

            <p className="font-mono text-[10px] text-zinc-600">
              NULLBYTE INTERNAL
            </p>
          </div>
        </header>

        <div className="space-y-5 p-6">
          <Message>
            Morning, {playerName}.
            <br />
            Welcome to Nullbyte.
          </Message>

          <Message>
            Daniel was supposed to show you around today.
          </Message>

          <Message>
            Small problem.
            <br />
            Daniel isn't here.
          </Message>

          <Message>
            He wasn't here yesterday either.
            <br />
            <br />
            But a client is.
          </Message>

          <div className="pt-4">
            <button
              type="button"
              onClick={startFirstMission}
              className="ml-12 flex items-center gap-2 rounded-lg bg-emerald-400 px-5 py-2.5 font-mono text-xs font-semibold text-[#06110b] transition hover:bg-emerald-300"
            >
              OPEN FIRST TICKET
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-300">
        MC
      </div>

      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-200">
            Maya Chen
          </span>

          <span className="font-mono text-[10px] text-zinc-700">
            Project Manager
          </span>
        </div>

        <div className="rounded-r-lg rounded-bl-lg border border-zinc-800 bg-[#11151d] px-4 py-3 text-sm leading-6 text-zinc-300">
          {children}
        </div>
      </div>
    </div>
  );
}