import {
  BookOpen,
  Search,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { getDocumentationForMission } from "../../game/documentation";
import { useCurrentMission } from "../../game/hooks/use-current-mission";

export function DocumentationPanel() {
  const mission =
    useCurrentMission();

  const [search, setSearch] =
    useState("");

  const entries = useMemo(() => {
    if (!mission) {
      return [];
    }

    const available =
      getDocumentationForMission(
        mission.order,
      );

    const query =
      search
        .trim()
        .toLowerCase();

    if (!query) {
      return available;
    }

    return available.filter(
      (entry) => {
        const haystack = [
          entry.title,
          entry.category,
          entry.summary,
          ...entry.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(
          query,
        );
      },
    );
  }, [mission, search]);

  if (!mission) {
    return null;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-b border-zinc-800 p-4">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-sky-300" />

          <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
            NULLBYTE DOCS
          </p>
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-700" />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search documentation..."
            className="w-full rounded-md border border-zinc-800 bg-[#090c11] py-2 pl-9 pr-3 font-mono text-xs text-zinc-300 outline-none placeholder:text-zinc-700 focus:border-sky-400/40"
          />
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {entries.length === 0 && (
          <div className="p-4 text-center font-mono text-xs text-zinc-700">
            No documentation found.
          </div>
        )}

        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-lg border border-zinc-800 bg-[#10141b] p-4"
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-sky-400">
              {entry.category}
            </p>

            <h3 className="mt-1 text-sm font-semibold text-zinc-200">
              {entry.title}
            </h3>

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              {entry.summary}
            </p>

            {entry.syntax && (
              <pre className="mt-3 overflow-x-auto rounded-md bg-[#090c11] p-3 font-mono text-[11px] leading-5 text-emerald-300">
                {entry.syntax}
              </pre>
            )}

            {entry.notes?.length ? (
              <ul className="mt-3 space-y-1.5">
                {entry.notes.map(
                  (note) => (
                    <li
                      key={note}
                      className="text-xs leading-5 text-zinc-600"
                    >
                      • {note}
                    </li>
                  ),
                )}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}