import { Example } from "@/utils/type";

export default async function getData(): Promise<Example[]> {
  return await fetch("https://upstash-examples-content.vercel.app/")
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return [];
    });
}
