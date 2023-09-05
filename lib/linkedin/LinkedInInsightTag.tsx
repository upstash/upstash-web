"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import * as insightTag from "@/lib/linkedin/lintrk";

export default function LinkedinInsightTag() {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    insightTag.event(13728580);

    console.log("EVENT TRIGGERED");
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        id="linkedin-insight-tag"
        src="/scripts/linkedin.js"
        type="text/javascript"
        strategy="afterInteractive"
        onLoad={() => {
          setLoaded(true);
        }}
        data-partner-id="5007892"
      />
    </div>
  );
}
