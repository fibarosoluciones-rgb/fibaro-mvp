"use client";

import { useTuLineStore } from "@/lib/store";

export function AnnouncementMarquee() {
  const announcements = useTuLineStore((state) => state.announcements);

  if (!announcements.length) return null;

  return (
    <div className="border-b border-white/60 bg-white/60 py-3 text-xs uppercase tracking-[0.4em] text-neutral-500">
      <div className="container-max flex items-center justify-between gap-4">
        {announcements.map((message) => (
          <p key={message} className="whitespace-nowrap">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
