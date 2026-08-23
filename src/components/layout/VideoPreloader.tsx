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
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Meet_Your_Editor/vidgrab-dowenload.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Who_I've_Edited_For/milestone-01.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Who_I've_Edited_For/milestone-02.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Who_I've_Edited_For/milestone-03.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Case_Studies/case-study-one.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Case_Studies/case-study-two.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Case_Studies/case-study-three.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Case_Studies/case-study-four.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Inside_The_Edit/process-01-research.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Inside_The_Edit/process-02-storyboard.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Inside_The_Edit/process-03-production.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Inside_The_Edit/process-04-edit.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Inside_The_Edit/process-05-motion.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Inside_The_Edit/process-06-publish.mp4",
  "https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Inside_The_Edit/process-07-analytics.mp4",
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
