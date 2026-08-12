import {
  ChevronDown,
  FileCode2,
  FileImage,
  FolderOpen,
  LockKeyhole,
} from "lucide-react";

import { useMemo } from "react";

import { useCurrentMission } from "../../game/hooks/use-current-mission";
import { useGameStore } from "../../store/use-game-store";

interface TreeNode {
  name: string;
  path: string;

  type:
    | "folder"
    | "file"
    | "asset";

  readOnly?: boolean;

  children: TreeNode[];
}

function createTree(
  files: {
    path: string;
    readOnly?: boolean;
  }[],
  assets: string[],
): TreeNode[] {
  const root: TreeNode[] = [];

  function insert(
    path: string,
    type: "file" | "asset",
    readOnly = false,
  ) {
    const parts = path.split("/");

    let current = root;

    parts.forEach((part, index) => {
      const isLast =
        index === parts.length - 1;

      const currentPath = parts
        .slice(0, index + 1)
        .join("/");

      let node = current.find(
        (candidate) =>
          candidate.name === part,
      );

      if (!node) {
        node = {
          name: part,
          path: currentPath,

          type: isLast
            ? type
            : "folder",

          readOnly: isLast
            ? readOnly
            : false,

          children: [],
        };

        current.push(node);
      }

      current = node.children;
    });
  }

  files.forEach((file) => {
    insert(
      file.path,
      "file",
      file.readOnly,
    );
  });

  assets.forEach((path) => {
    insert(
      path,
      "asset",
    );
  });

  return root;
}

export function FileExplorerPanel() {
  const mission =
    useCurrentMission();

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

  const tree = useMemo(() => {
    if (!mission) {
      return [];
    }

    return createTree(
      mission.files.map(
        (file) => ({
          path: file.path,
          readOnly:
            file.readOnly,
        }),
      ),

      mission.assets?.map(
        (asset) =>
          asset.path,
      ) ?? [],
    );
  }, [mission]);

  if (!mission) {
    return null;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-b border-zinc-800 px-4 py-4">
        <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
          PROJECT EXPLORER
        </p>

        <p className="mt-1 truncate text-sm font-medium text-zinc-300">
          {mission.briefing.client}
        </p>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <div className="mb-1 flex items-center gap-1 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
          <ChevronDown className="size-3" />

          PROJECT
        </div>

        {tree.map((node) => (
          <FileNode
            key={node.path}
            node={node}
            depth={0}
            activeFile={activeFile}
            onOpenFile={setActiveFile}
          />
        ))}
      </div>

      <footer className="border-t border-zinc-800 px-4 py-3">
        <p className="font-mono text-[9px] leading-5 text-zinc-700">
          Files marked with a lock are read-only.
        </p>
      </footer>
    </div>
  );
}

function FileNode({
  node,
  depth,
  activeFile,
  onOpenFile,
}: {
  node: TreeNode;
  depth: number;

  activeFile: string | null;

  onOpenFile: (
    path: string,
  ) => void;
}) {
  const isActive =
    node.path === activeFile;

  /**
   * Folder
   */
  if (
    node.type === "folder"
  ) {
    return (
      <div>
        <div
          className="flex items-center gap-2 rounded px-2 py-1.5 font-mono text-xs text-zinc-500"
          style={{
            paddingLeft:
              8 + depth * 14,
          }}
        >
          <FolderOpen className="size-3.5 shrink-0 text-amber-300/70" />

          <span className="truncate">
            {node.name}
          </span>
        </div>

        {node.children.map(
          (child) => (
            <FileNode
              key={child.path}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              onOpenFile={onOpenFile}
            />
          ),
        )}
      </div>
    );
  }

  /**
   * Assets cannot currently be opened
   * inside Monaco.
   */
  const isAsset =
    node.type === "asset";

  return (
    <button
      type="button"
      disabled={isAsset}
      onClick={() => {
        if (!isAsset) {
          onOpenFile(
            node.path,
          );
        }
      }}
      className={[
        "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-xs transition",

        isActive
          ? "bg-emerald-400/10 text-emerald-300"
          : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300",

        isAsset
          ? "cursor-default hover:bg-transparent"
          : "",
      ].join(" ")}
      style={{
        paddingLeft:
          8 + depth * 14,
      }}
    >
      {isAsset ? (
        <FileImage className="size-3.5 shrink-0 text-violet-300" />
      ) : (
        <FileCode2 className="size-3.5 shrink-0 text-orange-300" />
      )}

      <span className="min-w-0 flex-1 truncate">
        {node.name}
      </span>

      {node.readOnly && (
        <LockKeyhole
          className="size-3 shrink-0 text-zinc-600"
          aria-label="Read only"
        />
      )}
    </button>
  );
}