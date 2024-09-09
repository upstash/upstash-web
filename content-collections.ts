import { authors } from "@/utils/authors";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rt, { ReadTimeResults } from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const customers = defineCollection({
  name: "Customer",
  directory: "./data/customer",
  include: "*.mdx",
  schema: (z) => ({
    company_name: z.string(),
    company_url: z.string(),
    company_logo: z.string(),
    user_name: z.string(),
    user_title: z.string(),
    user_photo: z.string(),
    highlight: z.string(),
    cover_image: z.string(),
    draft: z.boolean().optional(),
    order: z.number().optional(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc);
    const slug = doc._meta.path;

    return {
      ...doc,
      mdx,
      slug,
    };
  },
});

export const jobs = defineCollection({
  name: "Job",
  directory: "./data/job",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    experience: z.string(),
    how: z.string(),
    location: z.string(),
    skills: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc);
    const slug = doc._meta.path;

    return {
      ...doc,
      mdx,
      slug,
    };
  },
});

export const posts = defineCollection({
  name: "Post",
  directory: "./data/blog",
  include: "*.mdx",
  schema: (z) => ({
    slug: z.string(),
    title: z.string(),
    description: z.string().optional(),
    authors: z.array(z.string()),
    tags: z.array(z.string()),
    image: z.string().optional(),
    tweet: z.string().optional(),
    draft: z.boolean().optional(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, {
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
    });

    const authorsData = doc.authors.map((username) => {
      const author = authors[username];
      return {
        username,
        ...author,
        image: `/authors/${author.image}`,
      };
    });

    const readingTime = rt(doc.content) as ReadTimeResults;
    const date = doc._meta.fileName.substring(-1, 10);

    return {
      ...doc,
      mdx,
      date,
      readingTime: readingTime.text,
      authorsData,
    };
  },
});

export default defineConfig({
  collections: [customers, jobs, posts],
});

//  remarkPlugins: [remarkGfm],
//  rehypePlugins: [
//   rehypeSlug,
//   [
//     rehypePrettyCode,
//     {
//       theme: {
//         dark: "poimandres",
//         light: "github-light",
//       },
//       onVisitLine(node: any) {
//         // Prevent lines from collapsing in `display: grid` mode, and allow empty
//         // lines to be copy/pasted
//         if (node.children.length === 0) {
//           node.children = [{ type: "text", value: " " }];
//         }
//       },
//       onVisitHighlightedLine(node: any) {
//         node.properties.className.push("line--highlighted");
//       },
//       onVisitHighlightedWord(node: any) {
//         node.properties.className = ["word--highlighted"];
//       },
//     },
//   ],
//   [
//     rehypeAutolinkHeadings,
//     {
//       properties: {
//         className: ["subheading-anchor"],
//         ariaLabel: "Link to section",
//       },
//     },
//   ],
