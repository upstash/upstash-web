import React from "react";
import cx from "@/utils/cx";

export interface IAppHeader extends React.HTMLAttributes<HTMLDivElement> {}

export default function AppHeader({ className, ...props }: IAppHeader) {
  return (
    <header className={cx("", className)} {...props}>
      <div>
        <div>sad</div>
      </div>
    </header>
  );
}
