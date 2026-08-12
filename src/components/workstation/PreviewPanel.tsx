import {
  ExternalLink,
  Monitor,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useCurrentMission } from "../../game/hooks/use-current-mission";
import { useGameStore } from "../../store/use-game-store";

import type { Mission } from "../../types/game";

const PREVIEW_NAVIGATION_MESSAGE =
  "the-last-deploy-preview-navigate";

function normalizeVirtualPath(
  path: string,
): string {
  return path
    .trim()
    .replace(/^\.\/+/, "")
    .replace(/^\/+/, "");
}

/**
 * Resolves a virtual relative path inside the player's project.
 *
 * Example:
 *
 * current:
 * pages/about.html
 *
 * href:
 * ../index.html
 *
 * result:
 * index.html
 */
function resolveVirtualPath(
  currentFile: string,
  target: string,
): string | null {
  const cleanTarget = target
    .split("#")[0]
    .split("?")[0]
    .trim();

  if (!cleanTarget) {
    return null;
  }

  /**
   * Ignore URL schemes:
   *
   * https:
   * http:
   * mailto:
   * tel:
   * data:
   * javascript:
   */
  if (
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(
      cleanTarget,
    )
  ) {
    return null;
  }

  if (
    cleanTarget.startsWith("//")
  ) {
    return null;
  }

  const currentParts =
    currentFile.split("/");

  /**
   * Remove the current file name.
   */
  currentParts.pop();

  const baseParts =
    cleanTarget.startsWith("/")
      ? []
      : currentParts;

  const targetParts =
    cleanTarget
      .replace(/^\/+/, "")
      .split("/");

  const resolved = [
    ...baseParts,
  ];

  for (const part of targetParts) {
    if (
      !part ||
      part === "."
    ) {
      continue;
    }

    if (part === "..") {
      resolved.pop();
      continue;
    }

    resolved.push(part);
  }

  return normalizeVirtualPath(
    resolved.join("/"),
  );
}

/**
 * Converts virtual asset paths used by the player
 *
 * assets/logo.svg
 *
 * into real runtime URLs used only by the preview.
 *
 * The player's source code is never modified.
 */
function resolveMissionAssets(
  document: Document,
  mission: Mission,
  currentFile: string,
) {
  if (!mission.assets?.length) {
    return;
  }

  const elements =
    Array.from(
      document.querySelectorAll<HTMLElement>(
        "[src]",
      ),
    );

  for (const element of elements) {
    const src =
      element.getAttribute(
        "src",
      );

    if (!src) {
      continue;
    }

    const virtualPath =
      resolveVirtualPath(
        currentFile,
        src,
      ) ??
      normalizeVirtualPath(src);

    const asset =
      mission.assets.find(
        (candidate) =>
          normalizeVirtualPath(
            candidate.path,
          ) === virtualPath,
      );

    if (!asset) {
      continue;
    }

    const runtimeUrl =
      new URL(
        asset.runtimePath,
        window.location.href,
      ).href;

    element.setAttribute(
      "src",
      runtimeUrl,
    );
  }
}

/**
 * Inject a tiny bridge into the preview.
 *
 * Relative page links are sent back to React
 * instead of trying to load real filesystem URLs.
 */
function injectNavigationBridge(
  document: Document,
) {
  const script =
    document.createElement(
      "script",
    );

  script.textContent = `
    document.addEventListener(
      "click",
      function (event) {
        const target = event.target;

        if (!(target instanceof Element)) {
          return;
        }

        const anchor =
          target.closest("a");

        if (!anchor) {
          return;
        }

        const href =
          anchor.getAttribute("href");

        if (!href) {
          return;
        }

        const normalized =
          href.trim().toLowerCase();

        if (
          normalized.startsWith("#") ||
          normalized.startsWith("mailto:") ||
          normalized.startsWith("tel:") ||
          normalized.startsWith("http://") ||
          normalized.startsWith("https://") ||
          normalized.startsWith("javascript:")
        ) {
          return;
        }

        event.preventDefault();

        window.parent.postMessage(
          {
            type: "${PREVIEW_NAVIGATION_MESSAGE}",
            href: href,
          },
          "*",
        );
      },
    );
  `;

  document.body.appendChild(
    script,
  );
}

function createPreviewDocument(
  html: string,
  mission: Mission,
  currentFile: string,
): string {
  const parser =
    new DOMParser();

  const document =
    parser.parseFromString(
      html,
      "text/html",
    );

  resolveMissionAssets(
    document,
    mission,
    currentFile,
  );

  injectNavigationBridge(
    document,
  );

  return `<!doctype html>${document.documentElement.outerHTML}`;
}

interface MissionPreviewFrameProps {
  mission: Mission;
  workspace: Record<string, string>;
}

function MissionPreviewFrame({
  mission,
  workspace,
}: MissionPreviewFrameProps) {
  const iframeRef =
    useRef<HTMLIFrameElement>(
      null,
    );

  const defaultEntryFile =
    useMemo(() => {
      return (
        mission.preview
          ?.entryFile ??
        mission.files.find(
          (file) =>
            file.language ===
            "html",
        )?.path ??
        null
      );
    }, [mission]);

  const [
    previewFile,
    setPreviewFile,
  ] = useState<string | null>(
    defaultEntryFile,
  );

  /**
   * The parent keys this component by mission id.
   * Entering another mission remounts the frame,
   * which resets the local preview navigation state.
   */
  const effectivePreviewFile =
    useMemo(() => {
      if (
        previewFile &&
        mission.files.some(
          (file) =>
            file.path ===
              previewFile &&
            file.language ===
              "html",
        )
      ) {
        return previewFile;
      }

      return defaultEntryFile;
    }, [
      mission,
      previewFile,
      defaultEntryFile,
    ]);

  /**
   * Receive navigation events from
   * the sandboxed iframe.
   */
  useEffect(() => {
    if (
      !effectivePreviewFile
    ) {
      return;
    }

    const currentMission =
      mission;

    const currentPreviewFile =
      effectivePreviewFile;

    function handleMessage(
      event: MessageEvent,
    ) {
      if (
        event.source !==
        iframeRef.current
          ?.contentWindow
      ) {
        return;
      }

      const data =
        event.data;

      if (
        !data ||
        data.type !==
          PREVIEW_NAVIGATION_MESSAGE ||
        typeof data.href !==
          "string"
      ) {
        return;
      }

      const targetPath =
        resolveVirtualPath(
          currentPreviewFile,
          data.href,
        );

      if (!targetPath) {
        return;
      }

      const exists =
        currentMission.files.some(
          (file) =>
            file.path ===
              targetPath &&
            file.language ===
              "html",
        );

      if (!exists) {
        return;
      }

      setPreviewFile(
        targetPath,
      );
    }

    window.addEventListener(
      "message",
      handleMessage,
    );

    return () => {
      window.removeEventListener(
        "message",
        handleMessage,
      );
    };
  }, [
    mission,
    effectivePreviewFile,
  ]);

  if (
    !effectivePreviewFile
  ) {
    return (
      <section className="flex min-h-0 items-center justify-center bg-white">
        <p className="font-mono text-xs text-zinc-500">
          Preview unavailable.
        </p>
      </section>
    );
  }

  const missionFile =
    mission.files.find(
      (file) =>
        file.path ===
        effectivePreviewFile,
    );

  const html =
    workspace[
      effectivePreviewFile
    ] ??
    missionFile?.content ??
    "";

  const srcDoc =
    createPreviewDocument(
      html,
      mission,
      effectivePreviewFile,
    );

  return (
    <section className="flex min-h-0 min-w-0 flex-col bg-[#0c0f15]">
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-zinc-800 bg-[#090c11] px-3">
        <div className="flex min-w-0 items-center gap-2">
          <Monitor className="size-3.5 shrink-0 text-zinc-600" />

          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
            Preview
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <span className="max-w-45 truncate font-mono text-[10px] text-zinc-500">
            {effectivePreviewFile}
          </span>

          <ExternalLink className="size-3 text-zinc-700" />
        </div>
      </header>

      <div className="min-h-0 flex-1 bg-white">
        <iframe
          ref={iframeRef}
          key={`${mission.id}:${effectivePreviewFile}`}
          title="Mission preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="h-full w-full border-0 bg-white"
        />
      </div>
    </section>
  );
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
    return (
      <section className="flex min-h-0 items-center justify-center bg-white">
        <p className="font-mono text-xs text-zinc-500">
          Preview unavailable.
        </p>
      </section>
    );
  }

  return (
    <MissionPreviewFrame
      key={mission.id}
      mission={mission}
      workspace={workspace}
    />
  );
}
