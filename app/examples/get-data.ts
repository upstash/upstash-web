import { Example } from "@/utils/type";

export default async function getData(): Promise<Example[]> {
  // https://upstash-examples-content.vercel.app/
  return await fetch("http://localhost:3001")
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return [];
    });
}
