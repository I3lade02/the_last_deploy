import Editor from "@monaco-editor/react";
import { FileCode2 } from "lucide-react";

import { mission001 } from "../../game/missions/mission-001";
import { useGameStore } from "../../store/use-game-store";

export function CodeWorkspace() {
  const workspace = useGameStore((state) => state.workspace);
  const activeFile = useGameStore((state) => state.activeFile);

  const setActiveFile = useGameStore(
    (state) => state.setActiveFile,
  );

  const updateFile = useGameStore((state) => state.updateFile);

  const activeMissionFile = mission001.files.find(
    (file) => file.path === activeFile,
  );

  if (!activeFile || !activeMissionFile) {
    return null;
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-[#0b0e13]">
      <div className="flex h-10 shrink-0 items-end border-b border-zinc-800 bg-[#090c11]">
        {mission001.files.map((file) => {
          const isActive = activeFile === file.path;

          return (
            <button
              key={file.path}
              type="button"
              onClick={() => setActiveFile(file.path)}
              className={[
                "flex h-full items-center gap-2 border-r border-zinc-800 px-4 font-mono text-[11px]",
                isActive
                  ? "border-t-2 border-t-emerald-400 bg-[#11151c] text-zinc-200"
                  : "border-t-2 border-t-transparent text-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-400",
              ].join(" ")}
            >
              <FileCode2 className="size-3.5 text-orange-300" />
              {file.path}
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1">
        <Editor
          path={activeFile}
          language={activeMissionFile.language}
          value={workspace[activeFile] ?? ""}
          onChange={(value) =>
            updateFile(activeFile, value ?? "")
          }
          theme="vs-dark"
          options={{
            automaticLayout: true,

            fontSize: 14,
            lineHeight: 22,

            fontFamily:
              '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',

            minimap: {
              enabled: false,
            },

            scrollBeyondLastLine: false,

            wordWrap: "off",

            padding: {
              top: 16,
            },

            tabSize: 2,

            renderLineHighlight: "line",

            smoothScrolling: true,

            cursorSmoothCaretAnimation: "on",

            bracketPairColorization: {
              enabled: true,
            },
          }}
        />
      </div>
    </section>
  );
}