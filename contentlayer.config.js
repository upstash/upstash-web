import { defineDocumentType, makeSource } from "contentlayer/source-files";

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
      resolve: (job) => job._raw.sourceFileName.replace(/\.md$/, ""),
    },
  },
}));

// export const Blog = defineDocumentType(() => ({
//   name: "Blog",
//   filePathPattern: `blog/*.md`,
//   fields: {
//     title: { type: "string", required: true },
//     summary: { type: "string", required: true },
//   },
// }));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Job],
});
