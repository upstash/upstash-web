"use client";

import * as React from "react";
import { HTMLAttributes } from "react";
import Icon, { ICON_NAMES } from "@/components/icon";
import copy from "copy-to-clipboard";
import cx from "@/utils/cx";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  code: string;
}

export default function CopyButton({ code, className, ...props }: Props) {
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
        className
      )}
      onClick={() => {
        copy(code);
        setHasCopied(true);
      }}
      {...props}
    >
      {hasCopied ? (
        <Icon icon={ICON_NAMES.Check} className="text-emerald-400" />
      ) : (
        <Icon icon={ICON_NAMES.Clipboard} />
      )}
    </button>
  );
}
