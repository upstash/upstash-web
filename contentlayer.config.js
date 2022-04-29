import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrism from "rehype-prism-plus";
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

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    authors: { type: "string", required: true },
    tags: { type: "json", required: true },
    categories: { type: "json" },
    image: { type: "string" },
  },
  computedFields: {
    date: {
      type: "date",
      resolve: (doc) => {
        return doc._raw.sourceFileName.substring(-1, 10);
      },
    },
    author: {
      type: "json",
      resolve: (doc) => {
        return authors[doc.authors];
      },
    },
    // customImage: {
    //   type: "string",
    //   resolve: (doc) => {
    //     const author = authors[doc.authors];
    //     return encodeURI(
    //       [
    //         "https://upstash-og-image.vercel.app/",
    //         doc.title,
    //         ".png",
    //         "?theme=light",
    //         "&md=1",
    //         "&fontSize=100px",
    //         "&authorName=",
    //         author.name,
    //         "&authorTitle=",
    //         author.title,
    //         "&authorPhoto=",
    //         author.image_url,
    //       ].join("")
    //     );
    //   },
    // },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Job, Blog],
  mdx: { rehypePlugins: [rehypePrism] },
});
