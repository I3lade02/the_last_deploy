import {
  BookOpen,
  Files,
  Ticket,
} from "lucide-react";

import { DocumentationPanel } from "./DocumentationPanel";
import { FileExplorerPanel } from "./FileExplorerPanel";
import { TicketPanel } from "./TicketPanel";

import { useGameStore } from "../../store/use-game-store";

import type { SidebarView } from "../../types/game";

const views: {
  id: SidebarView;
  label: string;
  icon: typeof Ticket;
}[] = [
  {
    id: "ticket",
    label: "Ticket",
    icon: Ticket,
  },

  {
    id: "files",
    label: "Files",
    icon: Files,
  },

  {
    id: "docs",
    label: "Documentation",
    icon: BookOpen,
  },
];

export function WorkstationSidebar() {
  const sidebarView =
    useGameStore(
      (state) =>
        state.sidebarView,
    );

  const setSidebarView =
    useGameStore(
      (state) =>
        state.setSidebarView,
    );

  return (
    <aside className="flex min-h-0 border-r border-zinc-800 bg-[#0c0f15]">
      <nav className="flex w-12 shrink-0 flex-col items-center border-r border-zinc-800 bg-[#090c11] py-2">
        {views.map((view) => {
          const Icon =
            view.icon;

          const active =
            view.id ===
            sidebarView;

          return (
            <button
              key={view.id}
              type="button"
              title={view.label}
              onClick={() =>
                setSidebarView(
                  view.id,
                )
              }
              className={[
                "relative flex size-10 items-center justify-center rounded-md transition",

                active
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-600 hover:bg-zinc-900 hover:text-zinc-300",
              ].join(" ")}
            >
              {active && (
                <span className="absolute -left-1 h-5 w-0.5 rounded bg-emerald-400" />
              )}

              <Icon className="size-4" />
            </button>
          );
        })}
      </nav>

      <div className="min-w-0 flex-1">
        {sidebarView ===
          "ticket" && (
          <TicketPanel />
        )}

        {sidebarView ===
          "files" && (
          <FileExplorerPanel />
        )}

        {sidebarView ===
          "docs" && (
          <DocumentationPanel />
        )}
      </div>
    </aside>
  );
}