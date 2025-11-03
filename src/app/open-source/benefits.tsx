import { ApplyNow } from "./apply-now";

export const Benefits = () => {
  return (
    <>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-xl bg-bg lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 text-left sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight">
                  $1,000 Monthly credit grant
                </p>
                <p className="mt-2 max-w-lg text-sm/6 opacity-60">
                  We cover all Upstash-related costs up to $1,000 per month.
                  Build on any Upstash product(s) without worrying about
                  billing.
                </p>
              </div>
              <div className="my-6 flex flex-1 items-center justify-center px-8 max-lg:pb-12 sm:px-10 lg:pb-6">
                <div className="relative mx-auto h-full w-full max-w-xs">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-900/25 shadow-2xl">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/10 to-black/30" />
                    <div className="relative flex h-full flex-col">
                      <div className="relative flex w-full flex-1 flex-col items-start gap-6 bg-neutral-900/100 p-7 dark:bg-neutral-900/50">
                        <div className="flex-1 pt-2">
                          <div className="size-6 md:size-8">
                            <UpstashLogo />
                          </div>
                        </div>
                        <div className="flex flex-col text-left text-white">
                          <p className="text-xs opacity-60">Card Number</p>
                          <p className="text-sm uppercase">
                            6277 7564 2527 4778
                          </p>
                        </div>

                        <div
                          className="pointer-events-none absolute inset-0"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 h-full w-full opacity-75 mix-blend-overlay">
                            <Noise />
                          </div>

                          <svg
                            width="355"
                            height="401"
                            viewBox="0 0 355 401"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g filter="url(#filter0_f_1731_5369)">
                              <path
                                d="M-124.445 498.012C-136.32 419.077 -126.853 399.598 -55.0021 337.335C-4.45087 293.529 78.6563 234.105 193.108 191.828C287.611 156.92 342.11 68.2273 307.885 47.9926C330.965 10.8217 331.314 -19.2976 315.916 -60.6865"
                                stroke="url(#paint0_linear_1731_5369)"
                                stroke-opacity="0.48"
                                strokeWidth="66.9487"
                                stroke-linecap="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_f_1731_5369"
                                x="-282.541"
                                y="-206.347"
                                width="762.824"
                                height="850.018"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="BackgroundImageFix"
                                  result="shape"
                                />
                                <feGaussianBlur
                                  stdDeviation="58.2454"
                                  result="effect1_foregroundBlur_1731_5369"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_1731_5369"
                                x1="-18.1456"
                                y1="380.643"
                                x2="215.537"
                                y2="-124.503"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#15E6F3" />
                                <stop offset="1" stop-color="#15F32B" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div className="relative z-10 flex h-20 w-full items-center justify-between bg-[#131416] px-7 text-center text-white">
                        <div className="flex flex-col text-left">
                          <p className="text-xs opacity-60">Card holder name</p>
                          <p className="text-sm uppercase">Upstash OSS</p>
                        </div>

                        <div className="flex flex-col text-left">
                          <p className="text-xs opacity-60">Expiry</p>
                          <p className="text-sm uppercase">02/30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-xl shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-xl bg-bg max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 text-left sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight">
                  Technical help
                </p>
                <p className="mt-2 max-w-lg text-sm/6 opacity-60">
                  When you're accepted into the program, we provide direct
                  technical support and help integrate Upstash into your
                  project.
                </p>
              </div>
              <div className="my-6 flex flex-1 items-center justify-center px-8 max-lg:pb-12 sm:px-10 lg:pb-6">
                <img
                  alt=""
                  src="/open-source/pr.png"
                  className="w-full rounded-xl object-cover max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-xl shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-xl bg-bg" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] text-left">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight">
                  Direct team access
                </p>
                <p className="mt-2 max-w-lg text-sm/6 opacity-60">
                  Reach out to our engineering team & get priority support just
                  like our Pro customers. We want to make you as productive as
                  possible.
                </p>
              </div>
              <div className="my-6 flex flex-1 items-center justify-center px-8 max-lg:pb-12 sm:px-10 lg:pb-6">
                <img
                  alt=""
                  src="/open-source/upstash-chat.png"
                  className="w-full rounded-xl max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-xl shadow-sm outline outline-black/5" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-xl bg-bg max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 text-left sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight">
                  Co-Marketing with Upstash
                </p>
                <p className="mt-2 max-w-lg text-sm/6 opacity-60">
                  We help publish technical articles about your business &
                  Upstash to our audience. Nice side-effect: High-quality
                  backlinks for your project.
                </p>
              </div>
              <div className="my-6 flex flex-1 items-center justify-center px-8 max-lg:pb-12 sm:px-10 lg:pb-6">
                <img
                  alt=""
                  src="/open-source/blog.png"
                  className="size-full rounded-xl bg-[#131416] object-contain object-center"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-xl shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </>
  );
};

function UpstashLogo() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="url(#pattern0_3113_38)" />
      <defs>
        <pattern
          id="pattern0_3113_38"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_3113_38" transform="scale(0.00282486)" />
        </pattern>
        <image
          id="image0_3113_38"
          width="354"
          height="354"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

function Noise() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="noiseFilter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="desaturated"
          />
          <feColorMatrix
            type="matrix"
            values="1 1 1 0 0
                    1 1 1 0 0  
                    1 1 1 0 0
                    0 0 0 0.8 0"
            in="desaturated"
            result="whiteNoise"
          />
        </filter>

        <pattern
          id="noisePattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="100"
            height="100"
            filter="url(#noiseFilter)"
            fill="white"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#noisePattern)" />
    </svg>
  );
}
