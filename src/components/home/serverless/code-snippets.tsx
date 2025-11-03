import cx from "@/utils/cx";
import { IconChevronRight } from "@tabler/icons-react";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { useEffect, useState } from "react";

const LANGUAGES_MAP = {
  js: "TypeScript",
  go: "Go",
  php: "PHP",
  py: "Python",
};

type Example = {
  title: string;
  snippets: {
    language: keyof typeof LANGUAGES_MAP;
    code: string;
  }[];
};

export type CodeSnippetsData = Example[];

type Props = {
  data: CodeSnippetsData;
};

export const CodeSnippets = ({ data }: Props) => {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [snippetIdx, setSnippetIdx] = useState(0);

  const example = data.at(exampleIdx) ?? data[0];
  const snippet = example.snippets.at(snippetIdx) ?? example.snippets[0];

  useEffect(() => {
    if (snippetIdx >= example.snippets.length && example.snippets.length > 0)
      setSnippetIdx(0);
  }, [snippetIdx, example]);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet.code]);

  return (
    <div className="col-span-1 flex w-full flex-col overflow-hidden rounded-2xl bg-black sm:col-span-3 md:flex-row">
      {/* EXAMPLE SELECTION */}
      <div className="w-full min-w-[100px] overflow-hidden md:w-[258px]">
        <div className="hidden h-10 items-center bg-zinc-800 px-6 text-[13px] text-white/40 md:flex">
          <span className="translate-y-[2px]">EXAMPLES</span>
        </div>
        <div className="flex w-full flex-wrap justify-center px-3 py-4 md:block">
          {data.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setExampleIdx(idx)}
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
      <div className="min-w-0 flex-grow">
        {/* TABS */}
        <div className="flex h-10 border-0 border-[#3D3D3F] bg-zinc-800 px-1 pt-2 md:border-l-2">
          {example.snippets.map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => setSnippetIdx(idx)}
              className={cx(
                "flex h-full items-center px-5 text-[13px]",
                snippetIdx === idx
                  ? "border-t-2 border-emerald-500 bg-black text-white"
                  : "border-t-2 border-transparent text-white/60",
              )}
            >
              {LANGUAGES_MAP[snippet.language]}
            </button>
          ))}
        </div>

        {/* CODE BODY */}
        <div className="h-[278px] min-h-0 w-full border-0 border-white/10 px-[6px] py-6 md:border-l-2">
          <pre className="no-scrollbar h-full !overflow-x-scroll !overflow-y-scroll !text-[.86em]">
            <code
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
