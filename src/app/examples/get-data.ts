import { z } from "zod";

const example = z.object({
  id: z.string(),
  githubUrl: z.string(),
  title: z.string(),
  products: z.array(z.enum(["redis", "kafka", "qstash"])),
  stack: z.array(z.string()).default([]),
  useCases: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  author: z.string(),
  body: z.string(),
  blogUrl: z.string().optional(),
  previewUrl: z.string().optional(),
});

const schema = z.array(example);

export type Example = z.infer<typeof example> & {
  slug: string;
};

let examplesData: Example[] | null = null;

export async function getData(): Promise<Example[]> {
  if (!examplesData) {
    const req = await fetch("https://upstash-examples-content.vercel.app/");
    const data = schema.parse(await req.json());

    examplesData = data.map((example) => ({
      ...example,
      // Turns slash and spaces into dashes
      // Removes all non-word characters
      // "Hello World" -> hello-world
      // "@upstash/redis example" -> upstash-redis-example
      slug: example.title
        .toLowerCase()
        .replace(/ \//g, "-")
        .replace(/[^\w-]/g, ""),
    }));
  }
  return examplesData;
}
