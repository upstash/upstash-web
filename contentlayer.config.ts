import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { authors } from "./utils/authors";

export const Customer = defineDocumentType(() => ({
  name: "Customer",
  filePathPattern: `customer/*.mdx`,
  contentType: "mdx",
  fields: {
    company_name: { type: "string", required: true },
    company_url: { type: "string", required: true },
    company_logo: { type: "string", required: true },
    user_name: { type: "string", required: true },
    user_title: { type: "string", required: true },
    user_photo: { type: "string", required: true },
    highlight: { type: "string", required: true },
    cover_image: { type: "string", required: true },
    draft: { type: "boolean" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc: any) => doc._raw.flattenedPath.split("/").at(-1),
    },
  },
}));

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
    authors: { type: "json", required: true, of: "string" },
    tags: { type: "json", of: "string", required: true },
    image: { type: "string" },
    tweet: { type: "string" },
    draft: { type: "boolean" },
  },
  computedFields: {
    authorsData: {
      type: "json",
      resolve: (doc) => {
        return doc.authors.map((authorId) => {
          const author = authors[authorId];
          return {
            id: authorId,
            ...author,
            image: `/authors/${author.image}`,
          };
        });
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
  documentTypes: [Customer, Job, Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "poimandres",
            light: "github-light",
          },
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
