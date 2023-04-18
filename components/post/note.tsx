import { ReactNode, SVGProps } from "react";
import cx from "@/utils/cx";

export default function PostNote({
  children,
  tip,
  info,
  caution,
  danger,
  title,
}: {
  children: ReactNode;
  note?: boolean;
  tip?: boolean;
  info?: boolean;
  caution?: boolean;
  danger?: boolean;
  title?: string;
}) {
  const style = [
    tip && "bg-green-600 bg-opacity-20 text-green-100",
    info && "bg-blue-600 bg-opacity-20 text-blue-100",
    caution && "bg-orange-600 bg-opacity-20 text-orange-100",
    danger && "bg-red-600 bg-opacity-20 text-red-100",
  ].find((color) => color);

  const icon = [
    tip && <PostNoteTip />,
    info && <PostNoteInfo />,
    caution && <PostNoteCaution />,
    danger && <PostNoteDanger />,
  ].find((color) => color);

  const _title = [
    tip && "Tip",
    info && "Info",
    caution && "Caution",
    danger && "Danger",
  ].find((color) => color);

  return (
    <div className={cx("rounded-xl bg-zinc-900 p-6", style)}>
      <div className="flex items-center gap-2 opacity-60">
        <span className="text-xl">{icon || <PostNoteDefault />}</span>
        <h6 className="font-display font-medium uppercase">
          {title || _title || "Note"}
        </h6>
      </div>

      <div className="mt-2">{children}</div>
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
