"use client";

import { ReactNode } from "react";
import { IntercomProvider } from "react-use-intercom";

export const IntercomWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <IntercomProvider
      appId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID as string}
      autoBoot
    >
      {children}
    </IntercomProvider>
  );
};
