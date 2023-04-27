import { ServerlessBox, ServerlessSummary, ServerlessTitle } from "./comp";
import { LogoIcon } from "@/components/app/logo";

export default function DesignedForTheEdge() {
  const duration = 120000;

  return (
    <ServerlessBox className="col-span-2 overflow-hidden">
      <header className="relative z-20">
        <ServerlessTitle link="https://docs.upstash.com/redis/features/globaldatabase">
          Designed for the edge
        </ServerlessTitle>
        <ServerlessSummary>
          Tested and optimized for Vercel Edge, Cloudflare Workers and Fastly
          Edge.
        </ServerlessSummary>
      </header>

      {/* body */}
      <div
        className="relative z-0 h-[320px] animate-spin"
        style={{
          animationDuration: `${duration}ms`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 z-0 flex
          h-[490px] w-[490px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <svg
            className="absolute left-0 top-0 z-0"
            width="490"
            height="490"
            viewBox="0 0 490 490"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.1" cx="245" cy="245" r="47.5" stroke="white" />
            <circle opacity="0.08" cx="245" cy="245" r="96.5" stroke="white" />
            <circle opacity="0.06" cx="245" cy="245" r="146.5" stroke="white" />
            <circle opacity="0.04" cx="245" cy="245" r="195.5" stroke="white" />
            <circle opacity="0.02" cx="245" cy="245" r="244.5" stroke="white" />
          </svg>

          <LogoIcon
            className="animate-spin"
            style={{
              animationDirection: "reverse",
              animationDuration: `${duration}ms`,
            }}
          />

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[118px]
            w-0 origin-bottom rotate-[120deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[-120deg] items-center justify-center rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="15"
                fill="none"
                className="animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: `${duration}ms`,
                }}
              >
                <path
                  fill="#F6821F"
                  d="m23.567 14.788.17-.587c.202-.698.127-1.343-.213-1.817-.312-.437-.832-.694-1.465-.724l-11.97-.151a.238.238 0 0 1-.189-.1.244.244 0 0 1-.027-.216.318.318 0 0 1 .278-.212l12.082-.153c1.433-.066 2.984-1.228 3.528-2.645l.689-1.8a.436.436 0 0 0 .018-.237A7.867 7.867 0 0 0 18.791 0a7.87 7.87 0 0 0-7.451 5.333A3.543 3.543 0 0 0 5.787 9.04a5.032 5.032 0 0 0-4.832 5.755.234.234 0 0 0 .23.201l22.1.003h.007a.292.292 0 0 0 .275-.212Z"
                />
                <path
                  fill="#FBAD41"
                  d="M27.554 6.514c-.11 0-.221.003-.331.008a.185.185 0 0 0-.052.012.19.19 0 0 0-.12.127l-.471 1.624c-.203.698-.128 1.343.212 1.817.312.437.832.694 1.464.724l2.552.153a.232.232 0 0 1 .182.099.24.24 0 0 1 .027.217.318.318 0 0 1-.277.212l-2.652.153c-1.44.066-2.99 1.228-3.534 2.645l-.191.5a.141.141 0 0 0 .126.192h9.131a.242.242 0 0 0 .235-.176 6.541 6.541 0 0 0-6.301-8.307Z"
                />
              </svg>
            </span>
          </span>

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[118px]
            w-0 origin-bottom rotate-[240deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[-240deg] items-center justify-center rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="16"
                fill="none"
                className="animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: `${duration}ms`,
                }}
              >
                <path
                  fill="#FF282D"
                  d="M23.227 3.152v8.275h2.486v-1.264h-.822V1.89h-1.664v1.26ZM1.642 10.163h.845V6.17h-.845V5.072l.845-.139V3.822c0-1.347.293-1.93 2.01-1.93.37 0 .81.054 1.195.123L5.464 3.37a3.105 3.105 0 0 0-.555-.05c-.605 0-.758.061-.758.652v.962h1.256V6.17H4.151v3.993h.836v1.264H1.642v-1.264ZM22.38 9.763c-.26.055-.488.048-.652.052-.685.017-.626-.208-.626-.854v-2.79h1.304V4.932h-1.304V1.891h-1.665v7.416c0 1.455.36 2.12 1.926 2.12.37 0 .88-.095 1.265-.178l-.247-1.486ZM32.72 10.17a.629.629 0 1 1 0 1.255.627.627 0 1 1 0-1.256Zm0 1.156a.53.53 0 0 0 .528-.529.524.524 0 0 0-.528-.522.522.522 0 0 0-.525.522c0 .29.235.53.525.53Zm.117-.22-.128-.187h-.087v.187h-.142v-.617h.258c.153 0 .248.077.248.213 0 .1-.05.169-.13.192l.155.212h-.174Zm-.215-.31h.113c.064 0 .107-.026.107-.094 0-.064-.043-.09-.104-.09h-.116v.184ZM17.36 6.168v-.222a7.165 7.165 0 0 0-1.275-.093c-.775 0-.87.411-.87.634 0 .315.108.485.947.669 1.227.275 2.459.562 2.459 2.083 0 1.443-.742 2.188-2.305 2.188-1.046 0-2.06-.224-2.835-.42V9.762h1.26v.221c.543.105 1.111.094 1.408.094.826 0 .96-.444.96-.68 0-.328-.237-.485-1.011-.642-1.46-.25-2.617-.748-2.617-2.23 0-1.403.938-1.953 2.5-1.953 1.06 0 1.864.164 2.639.36v1.235h-1.26ZM9.701 7.26l-.126-.126-.644.56a.306.306 0 0 0-.103-.018.319.319 0 0 0-.314.323c0 .179.14.323.314.323A.319.319 0 0 0 9.142 8a.33.33 0 0 0-.014-.097L9.7 7.26Z"
                />
                <path
                  fill="#FF282D"
                  d="m12.251 9.763-.001-5.18h-1.665v.486a3.403 3.403 0 0 0-1.131-.428h.01v-.575h.202v-.423H7.99v.423h.203v.575h.012a3.422 3.422 0 1 0 2.386 6.296l.3.49h1.758V9.763h-.398ZM8.928 9.76v-.195h-.2v.195a1.761 1.761 0 0 1-1.654-1.665h.198v-.2h-.197a1.76 1.76 0 0 1 1.653-1.65v.195h.2v-.196a1.76 1.76 0 0 1 1.658 1.602v.057h-.2v.2h.2v.054A1.76 1.76 0 0 1 8.928 9.76ZM29.926 4.933h3.433V6.17h-.82l-2.106 5.18c-.604 1.455-1.595 2.825-3.104 2.825-.372 0-.866-.042-1.208-.124l.15-1.51c.22.04.508.068.66.068.7 0 1.489-.434 1.736-1.19l-2.134-5.25h-.82V4.934h3.435V6.17h-.82l1.208 2.973 1.208-2.973h-.818V4.933Z"
                />
              </svg>
            </span>
          </span>

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[118px]
            w-0 origin-bottom rotate-[360deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[-360deg] items-center justify-center rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                fill="none"
                className="animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: `${duration}ms`,
                }}
              >
                <path fill="#000" d="m12.5 0 11.547 20H.953L12.5 0Z" />
              </svg>
            </span>
          </span>

          {/* orta boş halka */}

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[170px]
            w-0 origin-bottom rotate-[180deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[-180deg] items-center justify-center rounded-full bg-zinc-800" />
          </span>

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[170px]
            w-0 origin-bottom rotate-[60deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[60deg] items-center justify-center rounded-full bg-zinc-800" />
          </span>

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[170px]
            w-0 origin-bottom rotate-[300deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[300deg] items-center justify-center rounded-full bg-zinc-800" />
          </span>

          {/* dış boş halka */}

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[220px]
            w-0 origin-bottom rotate-[120deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[-120deg] items-center justify-center rounded-full bg-zinc-800" />
          </span>

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[220px]
            w-0 origin-bottom rotate-[240deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[240deg] items-center justify-center rounded-full bg-zinc-800" />
          </span>

          <span
            className="absolute bottom-1/2 left-1/2 z-10 flex h-[220px]
            w-0 origin-bottom rotate-[360deg] justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 rotate-[360deg] items-center justify-center rounded-full bg-zinc-800" />
          </span>
        </div>
      </div>
    </ServerlessBox>
  );
}
