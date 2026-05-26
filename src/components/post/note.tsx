import cx from "@/utils/cx";
import { ReactNode, SVGProps } from "react";

type NoteType = "tip" | "info" | "caution" | "danger";

export default function PostNote({
  children,
  type,
  title,
}: {
  children: ReactNode;
  type?: NoteType;
  title?: string;
}) {
  const wrapperStyle = {
    caution:
      "bg-orange-500/10 text-orange-800 dark:bg-orange-500/15 dark:text-orange-100",
    danger:
      "bg-red-500/10 text-red-800 dark:bg-red-500/15 dark:text-red-100",
  };

  const labelStyle = {
    caution: "text-orange-700 dark:text-orange-300",
    danger: "text-red-700 dark:text-red-300",
  };

  const icon = {
    tip: <PostNoteInfo />,
    info: <PostNoteInfo />,
    caution: <PostNoteCaution />,
    danger: <PostNoteDanger />,
  };

  const defaultLabel: Record<NoteType, string> = {
    tip: "Tip",
    info: "Note",
    caution: "Caution",
    danger: "Warning",
  };

  const label = title ?? defaultLabel[type ?? "info"];

  return (
    <div
      className={cx(
        "-mx-5 my-6 rounded-2xl p-5 md:-mx-6 md:p-6",
        "bg-emerald-900/5 text-text dark:bg-white/[0.04]",
        type && wrapperStyle[type],
      )}
    >
      <div
        className={cx(
          "mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider",
          "text-primary",
          type && labelStyle[type],
        )}
      >
        {icon[type ?? "info"]}
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

function PostNoteInfo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
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

function PostNoteCaution(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
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
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
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
