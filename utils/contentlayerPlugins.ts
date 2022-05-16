import * as unified from "unified";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxToMarkdown } from "mdast-util-mdx";
import { PostHeading } from "../contentlayer.config";
import Slugger from "github-slugger";

// https://github.com/contentlayerdev/website/blob/main/src/contentlayer/document/Post.ts#L108
export const tocPlugin =
  (headings: PostHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      node.children
        .filter((_: any) => _.type === "heading")
        .forEach((heading: any) => {
          const title = toMarkdown(
            { type: "paragraph", children: heading.children },
            { extensions: [mdxToMarkdown()] }
          )
            .trim()
            // removes MDX in headlines
            .replace(/<.*$/g, "")
            // remove backslashes (e.g. from list items)
            .replace(/\\/g, "")
            .trim();

          if (![2, 3].includes(heading.depth)) return;

          return headings.push({
            level: heading.depth,
            title,
            slug: new Slugger().slug(title),
          });
        });
    };
  };
