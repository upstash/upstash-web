export default function OGBlog({
  title,
  author,
}: {
  title: string;
  author: {
    name: string;
    title: string;
    url: string;
    image_url: string;
  };
}) {
  return (
    <div
      tw="flex flex-col items-stretch p-[70px] pb-[140px] h-full w-full bg-[#161616] text-white bg-no-repeat"
      // style={{
      //   backgroundImage: "url(https://upstash.com/assets/bg.png)",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center center",
      // }}
    >
      <header tw="flex">
        <h1 tw="m-0 leading-[1.16] text-7xl font-bold">{title}</h1>
      </header>

      <div tw="mt-auto flex items-end">
        <div tw="grow flex flex-col">
          <h4 tw="m-0 text-4xl font-bold text-[#00e9a3]">{author.name}</h4>
          <p tw="m-0 mt-3 text-4xl">{author.title}</p>
        </div>

        {author.image_url && (
          <div tw="flex items-center border-[6px] border-[#00e9a3] rounded-full">
            <img
              tw="w-36 h-36 rounded-full object-cover object-center border-[6px] border-black"
              alt={author.name}
              src={`https://upstash.com/${author.image_url}`}
            />
          </div>
        )}
      </div>

      <footer tw="absolute bottom-0 left-[70px] right-[70px] flex items-center justify-center bg-white text-gray-600 rounded-t-[30px]">
        <p tw="text-3xl my-4 leading-[1]">blog.upstash.com</p>
      </footer>
    </div>
  );
}
