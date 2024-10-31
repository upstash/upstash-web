"use client";

import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { Segment } from "./segment";

export const SegmentContext = React.createContext<Segment | null>(null);

type Props = {
  writeKey: string;
};
export const SegmentProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  writeKey,
}) => {
  const segment = useMemo(() => {
    const segment = new Segment();
    segment.load(writeKey).catch((err) => {
      console.warn(err);
    });
    return segment;
  }, [writeKey]);

  return (
    <SegmentContext.Provider value={segment}>
      {children}
    </SegmentContext.Provider>
  );
};
