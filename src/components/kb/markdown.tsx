import { CopyFeaturePre, img, table } from "@/components/post/mdx";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";

// An article's markdown as the blog renders its MDX: the same heading ids,
// code highlighting and components, so `.post` styles it the same. No "On
// this page", so the column can be wider. Raw HTML in the markdown is dropped.
const processor = remark()
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypePrettyCode, {
    theme: { dark: "github-dark-default", light: "github-light-default" },
    keepBackground: false,
  });

export async function KbMarkdown({ markdown }: { markdown: string }) {
  const tree = (await processor.run(processor.parse(markdown))) as Parameters<
    typeof toJsxRuntime
  >[0];
  return toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
    components: { pre: CopyFeaturePre, table, img },
  });
}
