"use client";

import cx from "@/utils/cx";
import Prism from "prismjs";
import { HTMLProps, ReactNode, useEffect, useState } from "react";

// import "prismjs/components/prism-python";
// import "prismjs/components/prism-go";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-php";

enum Language {
  JS = "JavaScript",
  PHP = "PHP",
  PY = "Python",
  GO = "Go",
  JAVA = "Java",
}

export default function CodeQStash() {
  const [lang, setLang] = useState<Language>(Language.JS);

  useEffect(() => {
    Prism.highlightAll();
  }, [lang]);

  return (
    <>
      <div className="flex items-center gap-px">
        {Object.values(Language).map((key) => {
          return (
            <label
              key={key}
              className={cx(
                "cursor-pointer select-none bg-white bg-opacity-10 px-4 py-1 text-sm text-white",
                "transition first:rounded-l-lg last:rounded-r-lg hover:bg-opacity-20",
                key === lang && "!bg-opacity-20",
              )}
            >
              <input
                className="pointer-events-none absolute opacity-0"
                type="radio"
                value={key}
                name="product"
                onChange={(e) => {
                  setLang(e.target.value as Language);
                }}
              />
              <span>{key}</span>
            </label>
          );
        })}
      </div>

      {/* body */}
      <div className="code-qstash mt-6 grid rounded-xl">
        <div className="p-0">
          <Pre hidden={lang !== Language.JS}>
            <code className="lang-js">{CODE[Language.JS]}</code>
          </Pre>
          <Pre hidden={lang !== Language.PHP}>
            <code className="lang-php">{CODE[Language.PHP]}</code>
          </Pre>{" "}
          <Pre hidden={lang !== Language.PY}>
            <code className="lang-py">{CODE[Language.PY]}</code>
          </Pre>{" "}
          <Pre hidden={lang !== Language.GO}>
            <code className="lang-go">{CODE[Language.GO]}</code>
          </Pre>{" "}
          <Pre hidden={lang !== Language.JAVA}>
            <code className="lang-java">{CODE[Language.JAVA]}</code>
          </Pre>
        </div>
      </div>
    </>
  );
}

function Pre({
  children,
  ...props
}: HTMLProps<HTMLPreElement> & {
  children: ReactNode;
}) {
  return (
    <pre
      className="no-scrollbar !m-0 !bg-transparent !p-0 !font-[inherit] !text-[.9em]"
      {...props}
    >
      {children}
    </pre>
  );
}

const CODE = {
  [Language.JS]: `import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://obi-wan-kenobi-31346.upstash.io',
  token: 'TOKEN',
})
   
const data = await redis.set('foo', 'bar');`,
  [Language.PHP]: ``,
  [Language.PY]: ``,
  [Language.GO]: ``,
  [Language.JAVA]: ``,
};
