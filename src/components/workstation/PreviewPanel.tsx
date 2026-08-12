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

interface PreviewSelection {
  missionId: string;
  path: string;
}

/**
 * ------------------------------------------------
 * PATH HELPERS
 * ------------------------------------------------
 */

function normalizeVirtualPath(
  path: string,
): string {
  return path
    .trim()
    .replace(/^\.\/+/, "")
    .replace(/^\/+/, "");
}

/**
 * Resolves relative project paths.
 *
 * Example:
 *
 * current file:
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
   * Ignore real URL schemes.
   *
   * http:
   * https:
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
   * Remove current filename.
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

  for (
    const part of
    targetParts
  ) {
    if (
      !part ||
      part === "."
    ) {
      continue;
    }

    if (
      part === ".."
    ) {
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
 * ------------------------------------------------
 * ASSET RESOLUTION
 * ------------------------------------------------
 */

/**
 * Converts the virtual paths used by the player's
 * code into actual URLs used by the Tauri preview.
 *
 * The source code stored in workspace is NOT modified.
 */
function resolveMissionAssets(
  document: Document,
  mission: Mission,
  currentFile: string,
) {
  if (
    !mission.assets?.length
  ) {
    return;
  }

  const elements =
    Array.from(
      document.querySelectorAll<HTMLElement>(
        "[src]",
      ),
    );

  for (
    const element of
    elements
  ) {
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
 * ------------------------------------------------
 * VIRTUAL CSS
 * ------------------------------------------------
 */

/**
 * Player files such as styles.css exist inside
 * our virtual workspace, not as real files that
 * the iframe can request.
 *
 * Therefore:
 *
 * <link rel="stylesheet" href="styles.css">
 *
 * is replaced ONLY inside the preview with:
 *
 * <style>...</style>
 *
 * The player's HTML remains unchanged.
 */
function injectVirtualStylesheets(
  document: Document,
  mission: Mission,

  workspace: Record<
    string,
    string
  >,

  currentFile: string,
) {
  const links =
    Array.from(
      document.querySelectorAll<HTMLLinkElement>(
        'link[rel~="stylesheet"][href]',
      ),
    );

  for (
    const link of
    links
  ) {
    const href =
      link.getAttribute(
        "href",
      );

    if (!href) {
      continue;
    }

    const virtualPath =
      resolveVirtualPath(
        currentFile,
        href,
      );

    if (!virtualPath) {
      continue;
    }

    const cssFile =
      mission.files.find(
        (file) =>
          file.path ===
            virtualPath &&
          file.language ===
            "css",
      );

    if (!cssFile) {
      continue;
    }

    const css =
      workspace[
        virtualPath
      ] ??
      cssFile.content;

    const style =
      document.createElement(
        "style",
      );

    style.setAttribute(
      "data-virtual-file",
      virtualPath,
    );

    style.textContent =
      css;

    link.replaceWith(
      style,
    );
  }
}

/**
 * ------------------------------------------------
 * VIRTUAL PAGE NAVIGATION
 * ------------------------------------------------
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

/**
 * ------------------------------------------------
 * PREVIEW DOCUMENT
 * ------------------------------------------------
 */

function createPreviewDocument(
  html: string,
  mission: Mission,

  workspace: Record<
    string,
    string
  >,

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

  injectVirtualStylesheets(
    document,
    mission,
    workspace,
    currentFile,
  );

  injectNavigationBridge(
    document,
  );

  return `<!doctype html>${document.documentElement.outerHTML}`;
}

/**
 * ------------------------------------------------
 * COMPONENT
 * ------------------------------------------------
 */

export function PreviewPanel() {
  const mission =
    useCurrentMission();

  const workspace =
    useGameStore(
      (state) =>
        state.workspace,
    );

  const iframeRef =
    useRef<HTMLIFrameElement>(
      null,
    );

  /**
   * Determine initial preview page.
   */
  const defaultEntryFile =
    useMemo(() => {
      if (!mission) {
        return null;
      }

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
    previewSelection,
    setPreviewSelection,
  ] =
    useState<PreviewSelection | null>(
      null,
    );

  const selectedPreviewFile =
    previewSelection
      ? previewSelection.missionId ===
        mission?.id
        ? previewSelection.path
        : null
      : null;

  /**
   * Make sure the currently selected
   * preview file actually exists.
   */
  const effectivePreviewFile =
    useMemo(() => {
      if (!mission) {
        return null;
      }

      if (
        selectedPreviewFile &&
        mission.files.some(
          (file) =>
            file.path ===
              selectedPreviewFile &&
            file.language ===
              "html",
        )
      ) {
        return selectedPreviewFile;
      }

      return defaultEntryFile;
    }, [
      mission,
      selectedPreviewFile,
      defaultEntryFile,
    ]);

  /**
   * ------------------------------------------------
   * RECEIVE NAVIGATION FROM IFRAME
   * ------------------------------------------------
   */

  useEffect(() => {
    if (
      !mission ||
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
      /**
       * Only accept messages from
       * our preview iframe.
       */
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

      setPreviewSelection(
        {
          missionId:
            currentMission.id,
          path: targetPath,
        },
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

  /**
   * ------------------------------------------------
   * EMPTY STATE
   * ------------------------------------------------
   */

  if (
    !mission ||
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

  /**
   * ------------------------------------------------
   * BUILD PREVIEW
   * ------------------------------------------------
   */

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
      workspace,
      effectivePreviewFile,
    );

  /**
   * ------------------------------------------------
   * RENDER
   * ------------------------------------------------
   */

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
