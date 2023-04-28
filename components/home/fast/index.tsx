"use client";

import dynamic from "next/dynamic";

const AnimatedGlobe = dynamic(() => import("./globe"), {
  ssr: false,
});

export default function Fast() {
  return <AnimatedGlobe />;
}
