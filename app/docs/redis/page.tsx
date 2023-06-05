import DocSidebar from "@/app/docs/sidebar";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export default async function DocPage({ params }: DocPageProps) {
  return (
    <>
      <DocSidebar />

      <div className="col-span-3">
        <h1>redis</h1>

        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            explicabo fugiat ipsum itaque magni maxime modi nemo obcaecati quasi
            sint, velit veritatis voluptatem voluptates. Ab autem blanditiis in
            nisi totam.
          </p>
        </div>
      </div>
    </>
  );
}
