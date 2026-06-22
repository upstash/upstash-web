import { authors } from "@/utils/authors";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeToc from "@jsdevtools/rehype-toc";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
import rt, { ReadTimeResults } from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkImageDimensions } from "./src/lib/remark-image-dimensions";

export const customers = defineCollection({
  name: "Customer",
  directory: "./data/customer",
  include: "*.mdx",
  schema: (z) => ({
    company_name: z.string(),
    company_url: z.string(),
    user_name: z.string(),
    user_title: z.string(),
    user_photo: z.string().optional(),
    highlight: z.string(),
    cover_image: z.string().optional(),
    draft: z.boolean().optional(),
    order: z.number().optional(),
    no_article: z.boolean().optional(),
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
    frozen: z.boolean().optional(),
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

export const glossary = defineCollection({
  name: "Glossary",
  directory: "./data/glossary",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    relations: z.array(z.string()).optional(),
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
    updated: z.string().optional(),
    publishedAt: z.string().optional(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm, remarkImageDimensions],
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
            theme: {
              dark: "github-dark-default",
              light: "github-light-default",
            },
            keepBackground: false,
          },
        ],
      ],
    });

    const authorsData = doc.authors
      .map((username) => {
        const author = authors[username];
        if (!author) {
          console.warn(
            `[content-collections] unknown author "${username}" in ${doc._meta.filePath}`,
          );
          return null;
        }
        return {
          username,
          ...author,
          image: `/authors/${author.image}`,
        };
      })
      .filter((author) => author !== null);

    const readingTime = rt(doc.content) as ReadTimeResults;
    const date = doc._meta.fileName.substring(-1, 10);

    const wordCount = countWords(doc.content);
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220));

    return {
      ...doc,
      mdx,
      date,
      readingTime: readingTime.text,
      readingTimeMinutes,
      wordCount,
      authorsData,
    };
  },
});

function countWords(markdown: string): number {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, " ");
  const withoutTags = withoutCode.replace(/<\/?[A-Za-z][^>]*>/g, " ");
  const words = withoutTags.match(/[A-Za-z0-9][A-Za-z0-9'-]*/g);
  return words?.length ?? 0;
}

export default defineConfig({
  collections: [customers, jobs, glossary, posts],
});
