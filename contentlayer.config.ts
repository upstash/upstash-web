import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrism from "rehype-prism-plus";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import authors from "./authors";

export const Job = defineDocumentType(() => ({
  name: "Job",
  filePathPattern: `job/*.md`,
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    experience: { type: "string", required: true },
    how: { type: "string", required: true },
    location: { type: "string", required: true },
    skills: { type: "json", required: true },
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
    tags: { type: "json", required: true },
    image: { type: "string" },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => {
        return `https://upstash.com/blog/${doc.slug}`;
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
    authorObj: {
      type: "json",
      resolve: (doc) => {
        return { slug: doc.author, ...authors[doc.author] };
      },
    },
    metaImage: {
      type: "string",
      resolve: (doc) => {
        const authorObj = authors[doc.author];
        return encodeURI(
          [
            "https://upstash-og-image.vercel.app/",
            doc.title,
            ".png",
            "?theme=light",
            "&md=1",
            "&fontSize=100px",
            "&authorName=",
            authorObj.name,
            "&authorTitle=",
            authorObj.title,
            "&authorPhoto=",
            authorObj.image_url,
          ].join("")
        );
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
      [
        rehypePrism,
        {
          // showLineNumbers: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
