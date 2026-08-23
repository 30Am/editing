"use client";

import { useEffect } from "react";

// Every video used on the site, roughly in scroll order. Prefetched into
// the browser's HTTP cache during idle time after the page has loaded, so
// that by the time a section's IntersectionObserver mounts its <video>,
// the bytes are already local and playback starts instantly instead of
// waiting on a fresh network request.
const VIDEO_URLS = [
  "/hero_videos/brx.mp4",
  "/hero_videos/Diary%20Of%20A%20Ceo.mp4",
  "/hero_videos/Dr%20Anchal.mp4",
  "/vidgrab-dowenload.mp4",
  "/videobb2/milestone-01.mp4",
  "/videobb2/milestone-02.mp4",
  "/videobb2/milestone-03.mp4",
  "/videos/featured/case-study-one.mp4",
  "/videos/featured/case-study-two.mp4",
  "/videos/featured/case-study-three.mp4",
  "/videos/featured/case-study-four.mp4",
  "/videobb/process-01-research.mp4",
  "/videobb/process-02-storyboard.mp4",
  "/videobb/process-03-production.mp4",
  "/videobb/process-04-edit.mp4",
  "/videobb/process-05-motion.mp4",
  "/videobb/process-06-publish.mp4",
  "/videobb/process-07-analytics.mp4",
];

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

export default function VideoPreloader() {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation })
      .connection;
    if (
      connection &&
      (connection.saveData || /^(slow-2g|2g)$/.test(connection.effectiveType ?? ""))
    ) {
      return;
    }

    let cancelled = false;

    const prefetchAll = async () => {
      for (const url of VIDEO_URLS) {
        if (cancelled) return;
        try {
          await fetch(url, { cache: "force-cache" });
        } catch {
          // Best-effort — a failed prefetch just falls back to the
          // normal on-demand load when the section scrolls into view.
        }
      }
    };

    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const handle = hasIdleCallback
      ? window.requestIdleCallback(prefetchAll, { timeout: 4000 })
      : window.setTimeout(prefetchAll, 1500);

    return () => {
      cancelled = true;
      if (hasIdleCallback) {
        window.cancelIdleCallback(handle as number);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, []);

  return null;
}
