import HomeSections from "@/components/home";

export default function Home() {
  console.log(process.env.VERCEL_URL);
  return <HomeSections />;
}
