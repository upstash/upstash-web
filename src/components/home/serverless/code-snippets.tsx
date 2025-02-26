import cx from "@/utils/cx";
import { IconChevronRight } from "@tabler/icons-react";
import Prism from "prismjs";
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
    <div className="col-span-1 flex w-full overflow-hidden rounded-xl sm:col-span-3">
      {/* EXAMPLE SELECTION */}
      <div className="w-[258px] min-w-0 bg-black">
        <div className="bg-zinc-800 px-6 py-4 text-left text-[13px] text-white/40">
          EXAMPLES
        </div>
        <div className="px-3 py-4">
          {data.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setExampleIdx(idx)}
              className={cx(
                "flex h-10 w-full items-center text-nowrap rounded-md px-3 transition-colors",
                exampleIdx === idx
                  ? "justify-between bg-white text-black"
                  : "text-white hover:bg-white/10",
              )}
            >
              {example.title}
              {exampleIdx === idx && (
                <IconChevronRight size={20} className="text-black/50" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* LANGUAGE SELECTION */}
      <div className="flex-grow">
        {/* TABS */}
        <div className="flex bg-zinc-800 pt-2">
          {example.snippets.map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => setSnippetIdx(idx)}
              className={cx(
                "px-5 py-[12px] text-[13px]",
                snippetIdx === idx
                  ? "border-t-2 border-emerald-500 border-b-transparent bg-black pt-[10px] text-white"
                  : "text-white/60",
              )}
            >
              {LANGUAGES_MAP[snippet.language]}
            </button>
          ))}
        </div>

        {/* CODE BODY */}
        <div className="h-full bg-black p-6">
          <pre className={"no-scrollbar text-left !text-[.86em]"}>
            <code className={`lang-${snippet.language}`}>
              {snippet.code.trim()}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
