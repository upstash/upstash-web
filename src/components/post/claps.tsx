"use client";

import Claps from "@upstash/claps";

export default function Clap({ tweet }: { tweet?: string }) {
  return <Claps fixed="left" replyUrl={tweet} shareButton={false} />;
}
