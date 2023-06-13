import { ReactNode } from "react";
import DocSidebar from "@/app/docs/sidebar";
import { docsConfig } from "./config";

export default function DocRedisLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocSidebar menu={docsConfig} />

      <div className="col-span-3 border-b border-b-white/5 pb-20">
        {children}
      </div>
    </>
  );
}
