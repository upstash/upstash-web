import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrism from "rehype-prism-plus";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import authors from "./utils/authors";
import { bundleMDX } from "mdx-bundler";
import { tocPlugin } from "./utils/contentlayerPlugins";

export type PostHeading = { level: number; title: string; slug: string };

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
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ""),
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
    image: {
      type: "string",
      resolve: (doc) => {
        return `https://upstash.com/api/og/blog?title=${doc.title}&author=${doc.author}`;
      },
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings: PostHeading[] = [];

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              tocPlugin(headings),
            ];
            return opts;
          },
        });

        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Job, Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
