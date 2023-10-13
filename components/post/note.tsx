import { ReactNode, SVGProps } from "react";

import cx from "@/utils/cx";

export default function PostNote({
  children,
  type,
  title,
}: {
  children: ReactNode;
  type?: "tip" | "info" | "caution" | "danger";
  title?: string;
}) {
  const style = {
    tip: "bg-emerald-300/5 text-emerald-200 border-emerald-300/5",
    info: "bg-blue-300/5 text-blue-200 border-blue-300/5",
    caution: "bg-orange-300/5 text-orange-200 border-orange-300/5",
    danger: "bg-red-300/10 text-red-200 border-red-300/10",
  };

  const icon = {
    tip: <PostNoteTip />,
    info: <PostNoteInfo />,
    caution: <PostNoteCaution />,
    danger: <PostNoteDanger />,
  };

  return (
    <div
      className={cx(
        "flex items-start gap-4 rounded-xl md:px-6 md:py-5",
        "border border-white/5 bg-white/5 p-4 text-zinc-200",
        type && style[type],
      )}
    >
      <span className="text-2xl">
        {(type && icon[type]) || <PostNoteDefault />}
      </span>

      <div className="-mt-0.5">
        {title && <h6 className="mb-1 font-display font-semibold">{title}</h6>}
        {children}
      </div>
    </div>
  );
}

function PostNoteDefault(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
      <polyline points="11 12 12 12 12 16 13 16" />
    </svg>
  );
}

function PostNoteTip(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <line x1="9.7" y1="17" x2="14.3" y2="17" />
    </svg>
  );
}

function PostNoteInfo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function PostNoteCaution(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 9v2m0 4v.01" />
      <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
    </svg>
  );
}

function PostNoteDanger(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
    </svg>
  );
}
