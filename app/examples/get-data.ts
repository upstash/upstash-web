
import { z } from "zod"
const example = z.object({

  id: z.string(),
  githubUrl: z.string(),
  title: z.string(),
  products: z.array(z.enum(["redis" , "kafka" , "qstash"])),
  stack: z.array(z.string()),
  useCases: z.array(z.string()),
  languages: z.array(z.string()),
  platforms: z.array(z.string()),
  author: z.string(),
  body: z.string(),
  blogUrl: z.string(),
  previewUrl: z.string(),


})

const schema = z.array(example)
export type Example = z.infer<typeof example>

export  async function getData(): Promise<Example[]> {
  return await fetch("https://upstash-examples-content.vercel.app/")
    .then(async(res) => schema.parse(await res.json()))
    .catch((err) => {
      console.log(err);
      return [];
    });
}
