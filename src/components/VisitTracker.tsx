"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer,
      search: window.location.search,
    });
    const blob = new Blob([payload], { type: "application/json" });
    if (!navigator.sendBeacon("/api/track", blob)) {
      void fetch("/api/track", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }
  }, [pathname]);

  return null;
}
