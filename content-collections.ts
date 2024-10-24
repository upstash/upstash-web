import { authors } from "@/utils/authors";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeToc from "@jsdevtools/rehype-toc";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
import rt, { ReadTimeResults } from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

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
          rehypeToc,
          {
            headings: ["h2", "h3"],
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: "poimandres",
            // transformers: [
            //   transformerCopyButton({
            //     visibility: "always",
            //     feedbackDuration: 3_000,
            //   }),
            // ],
          },
        ],
        [
          // @ts-ignore
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              class: 'relative mt-[12px] left-[10px] anchor-link',
            },
            content: fromHtmlIsomorphic(
              `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentcolor" d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z"></path></svg>`,
              {
                fragment: true,
              },
            ).children,
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
