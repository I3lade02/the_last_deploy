import Editor from "@monaco-editor/react";

import {
  FileCode2,
  LockKeyhole,
} from "lucide-react";

import { useCurrentMission } from "../../game/hooks/use-current-mission";
import { useGameStore } from "../../store/use-game-store";

export function CodeWorkspace() {
  const mission =
    useCurrentMission();

  const workspace =
    useGameStore(
      (state) =>
        state.workspace,
    );

  const activeFile =
    useGameStore(
      (state) =>
        state.activeFile,
    );

  const setActiveFile =
    useGameStore(
      (state) =>
        state.setActiveFile,
    );

  const updateFile =
    useGameStore(
      (state) =>
        state.updateFile,
    );

  if (!mission) {
    return null;
  }

  const activeMissionFile =
    mission.files.find(
      (file) =>
        file.path ===
        activeFile,
    );

  if (!activeMissionFile) {
    return (
      <section className="flex min-h-0 flex-1 items-center justify-center border-r border-zinc-800 bg-[#0b0e13]">
        <p className="font-mono text-xs text-zinc-700">
          No file selected.
        </p>
      </section>
    );
  }

  const value =
    workspace[
      activeMissionFile.path
    ] ??
    activeMissionFile.content;

  return (
    <section className="flex min-h-0 flex-1 flex-col border-r border-zinc-800 bg-[#0b0e13]">
      {/* File tabs */}
      <div className="flex h-10 shrink-0 items-stretch overflow-x-auto border-b border-zinc-800 bg-[#090c11]">
        {mission.files.map(
          (file) => {
            const active =
              file.path ===
              activeFile;

            return (
              <button
                key={file.path}
                type="button"
                onClick={() =>
                  setActiveFile(
                    file.path,
                  )
                }
                className={[
                  "flex shrink-0 items-center gap-2 border-r border-zinc-800 px-3 font-mono text-[11px] transition",

                  active
                    ? "bg-[#0f131a] text-zinc-200"
                    : "bg-[#090c11] text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400",
                ].join(" ")}
              >
                <FileCode2
                  className={[
                    "size-3.5",

                    active
                      ? "text-orange-300"
                      : "text-zinc-700",
                  ].join(" ")}
                />

                <span>
                  {file.path}
                </span>

                {file.readOnly && (
                  <LockKeyhole
                    className="size-3 text-zinc-600"
                    aria-label="Read only"
                  />
                )}
              </button>
            );
          },
        )}
      </div>

      {/* Small read-only notice */}
      {activeMissionFile.readOnly && (
        <div className="flex h-7 shrink-0 items-center gap-2 border-b border-amber-400/10 bg-amber-400/3 px-3">
          <LockKeyhole className="size-3 text-amber-400/60" />

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber-300/50">
            Read only
          </span>
        </div>
      )}

      {/* Monaco */}
      <div className="min-h-0 flex-1">
        <Editor
          path={`${mission.id}/${activeMissionFile.path}`}
          language={
            activeMissionFile.language
          }
          value={value}
          onChange={(nextValue) => {
            if (
              activeMissionFile.readOnly
            ) {
              return;
            }

            updateFile(
              activeMissionFile.path,
              nextValue ?? "",
            );
          }}
          theme="vs-dark"
          options={{
            automaticLayout:
              true,

            readOnly:
              activeMissionFile.readOnly ??
              false,

            fontSize: 14,

            lineHeight: 22,

            fontFamily:
              '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',

            minimap: {
              enabled: false,
            },

            scrollBeyondLastLine:
              false,

            wordWrap: "off",

            padding: {
              top: 16,
            },

            tabSize: 2,

            insertSpaces:
              true,

            renderLineHighlight:
              "line",

            smoothScrolling:
              true,

            cursorSmoothCaretAnimation:
              "on",

            bracketPairColorization: {
              enabled: true,
            },

            readOnlyMessage: {
              value:
                "This file is read-only.",
            },
          }}
        />
      </div>
    </section>
  );
}