"use client";

import Icon, { ICON_NAMES } from "@/components/icon";
import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import copy from "copy-to-clipboard";
import * as React from "react";
import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  code: string;
  eventName?: string;
  eventParams?: Record<string, unknown>;
}

export default function CopyButton({
  code,
  className,
  eventName,
  eventParams,
  ...props
}: Props) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) setTimeout(() => setHasCopied(false), 1500);
  }, [hasCopied]);

  return (
    <button
      type="button"
      aria-label="Copy code to clipboard"
      className={cx(
        "inline-flex items-center justify-center transition",
        className,
      )}
      onClick={() => {
        copy(code);
        setHasCopied(true);
        if (eventName) {
          trackEvent(eventName, eventParams);
        }
      }}
      {...props}
    >
      {hasCopied ? (
        <Icon icon={ICON_NAMES.Check} />
      ) : (
        <Icon icon={ICON_NAMES.Clipboard} />
      )}
    </button>
  );
}
