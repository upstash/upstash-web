import CopyButton from "@/components/copy-button";
import cx from "@/utils/cx";
import { IconChevronRight } from "@tabler/icons-react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { useEffect, useRef, useState } from "react";

// Highlight after React mounts so Prism cannot change server HTML before hydration.
Prism.manual = true;

const LANGUAGES_MAP = {
  js: "TypeScript",
  ts: "TypeScript",
  tsx: "React",
  go: "Go",
  php: "PHP",
  py: "Python",
};

type Example = {
  title: string;
  description?: string;
  snippets: {
    language: keyof typeof LANGUAGES_MAP;
    code: string;
    filename?: string;
  }[];
};

export type CodeSnippetsData = Example[];

type Props = {
  data: CodeSnippetsData;
  codeBodyClassName?: string;
};

export const CodeSnippets = ({ data, codeBodyClassName }: Props) => {
  const codeRef = useRef<HTMLElement>(null);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [snippetIdx, setSnippetIdx] = useState(0);

  const example = data.at(exampleIdx) ?? data[0];
  const snippet = example.snippets.at(snippetIdx) ?? example.snippets[0];

  useEffect(() => {
    if (snippetIdx >= example.snippets.length && example.snippets.length > 0) {
      setSnippetIdx(0);
    }
  }, [snippetIdx, example]);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.textContent = snippet.code.trim();
      Prism.highlightElement(codeRef.current);
    }
  }, [snippet.code]);

  return (
    <div className="col-span-1 flex w-full flex-col overflow-hidden rounded-2xl bg-black sm:col-span-3 md:flex-row">
      {/* EXAMPLE SELECTION */}
      <div className="w-full min-w-[100px] shrink-0 overflow-hidden md:w-[220px]">
        <div className="hidden h-10 items-center bg-zinc-800 px-6 text-[13px] text-white/40 md:flex">
          <span className="translate-y-[2px]">EXAMPLES</span>
        </div>
        <div className="flex w-full flex-wrap justify-center px-3 py-4 md:block">
          {data.map((example, idx) => (
            <button
              key={example.title}
              type="button"
              aria-pressed={exampleIdx === idx}
              onClick={() => {
                setExampleIdx(idx);
                setSnippetIdx(0);
              }}
              className={cx(
                "flex h-[32px] items-center whitespace-nowrap rounded-md px-3 transition-colors md:w-full",
                exampleIdx === idx
                  ? "justify-between bg-white text-black"
                  : "text-white hover:bg-white/10",
              )}
            >
              <span className="truncate">{example.title}</span>
              {exampleIdx === idx && (
                <IconChevronRight size={20} className="text-black/50" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* LANGUAGE SELECTION */}
      <div className="min-w-0 flex-1">
        {/* TABS */}
        <div className="flex min-h-10 items-start border-0 border-[#3D3D3F] bg-zinc-800 px-1 pt-2 md:border-l-2">
          <div className="flex min-w-0 flex-1 overflow-x-auto">
            {example.snippets.map((snippet, idx) => (
              <button
                key={snippet.filename ?? snippet.language}
                type="button"
                aria-pressed={snippetIdx === idx}
                onClick={() => setSnippetIdx(idx)}
                className={cx(
                  "flex h-8 shrink-0 items-center whitespace-nowrap px-4 text-[13px]",
                  snippetIdx === idx
                    ? "border-t-2 border-emerald-500 bg-black text-white"
                    : "border-t-2 border-transparent text-white/60",
                )}
              >
                {snippet.filename ?? LANGUAGES_MAP[snippet.language]}
              </button>
            ))}
          </div>
          <CopyButton
            code={snippet.code.trim()}
            className="mx-2 h-8 shrink-0 text-white/60 hover:text-white"
          />
        </div>
        {example.description && (
          <p className="border-white/10 px-5 py-3 text-left text-sm text-zinc-400 md:border-l-2">
            {example.description}
          </p>
        )}

        {/* CODE BODY */}
        <div
          className={cx(
            "h-[278px] min-h-0 w-full border-0 border-white/10 px-[6px] py-6 md:border-l-2",
            codeBodyClassName,
          )}
        >
          <pre className="no-scrollbar h-full !overflow-x-scroll !overflow-y-scroll !text-[.86em]">
            <code
              ref={codeRef}
              className={`language-${snippet.language} line-numbers leading-[1.4] [&>.line-numbers-rows]:!border-r-0`}
            >
              {snippet.code.trim()}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
