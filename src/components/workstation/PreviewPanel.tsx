import {
  Monitor,
} from "lucide-react";

import { useCurrentMission } from "../../game/hooks/use-current-mission";

import { useGameStore } from "../../store/use-game-store";

function injectBaseHref(
  html: string,
  baseHref?: string,
): string {
  if (!baseHref) {
    return html;
  }

  const absoluteBase =
    new URL(
      baseHref,
      window.location.href,
    ).href;

  const baseTag =
    `<base href="${absoluteBase}">`;

  if (
    /<head[\s>]/i.test(html)
  ) {
    return html.replace(
      /<head([^>]*)>/i,

      `<head$1>${baseTag}`,
    );
  }

  if (
    /<html[\s>]/i.test(html)
  ) {
    return html.replace(
      /<html([^>]*)>/i,

      `<html$1><head>${baseTag}</head>`,
    );
  }

  return `<head>${baseTag}</head>${html}`;
}

export function PreviewPanel() {
  const mission =
    useCurrentMission();

  const workspace =
    useGameStore(
      (state) =>
        state.workspace,
    );

  if (!mission) {
    return null;
  }

  const entryFile =
    mission.preview
      ?.entryFile ??
    mission.files.find(
      (file) =>
        file.language ===
        "html",
    )?.path;

  const html =
    entryFile
      ? workspace[
          entryFile
        ] ?? ""
      : "";

  const srcDoc =
    injectBaseHref(
      html,
      mission.preview
        ?.baseHref,
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
              client-preview.local
            </div>
          </div>

          <iframe
            key={
              mission.id
            }
            title="Mission preview"
            srcDoc={srcDoc}
            sandbox=""
            className="h-[calc(100%-2rem)] w-full bg-white"
          />
        </div>
      </div>
    </section>
  );
}