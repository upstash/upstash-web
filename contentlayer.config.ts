import { defineDocumentType, makeSource } from "contentlayer/source-files";

import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import authors from "./utils/authors";




export const Job = defineDocumentType(() => ({
  name: "Job",
  filePathPattern: `job/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    experience: { type: "string", required: true },
    how: { type: "string", required: true },
    location: { type: "string", required: true },
    skills: { type: "json", required: true },
    draft: { type: "boolean" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc: any) => doc._raw.flattenedPath.split("/").at(-1),
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    description: { type: "string" },
    author: { type: "string", required: true },
    tags: { type: "json", of: "string", required: true },
    image: { type: "string" },
    tweet: { type: "string" },
    draft: { type: "boolean" },
  },
  computedFields: {
    authorObj: {
      type: "json",
      resolve: (doc) => {
        const author = authors[doc.author as keyof typeof authors];
        return {
          ...author,
          photo: `/authors/${author.image}`,
        };
      },
    },
    readingTime: {
      type: "json",
      resolve: (doc) => {
        return readingTime(doc.body.raw);
      },
    },
    date: {
      type: "date",
      resolve: (doc) => {
        return doc._raw.sourceFileName.substring(-1, 10);
      },
    },
  },
}));



export default makeSource({
  contentDirPath: "./data",
  documentTypes: [Job, Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "poimandres",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
