const { withContentCollections } = require("@content-collections/next");

// Google Ads audience/conversion pings (/pagead/1p-user-list/...) go to the
// visitor's regional Google domain (www.google.co.in, www.google.com.br, ...).
// CSP wildcards can't span ccTLDs, so enumerate the canonical list from
// https://www.google.com/supported_domains
const googleAdsDomains =
  ".google.com .google.ad .google.ae .google.com.af .google.com.ag .google.al .google.am .google.co.ao .google.com.ar .google.as .google.at .google.com.au .google.az .google.ba .google.com.bd .google.be .google.bf .google.bg .google.com.bh .google.bi .google.bj .google.com.bn .google.com.bo .google.com.br .google.bs .google.bt .google.co.bw .google.by .google.com.bz .google.ca .google.cd .google.cf .google.cg .google.ch .google.ci .google.co.ck .google.cl .google.cm .google.cn .google.com.co .google.co.cr .google.com.cu .google.cv .google.com.cy .google.cz .google.de .google.dj .google.dk .google.dm .google.com.do .google.dz .google.com.ec .google.ee .google.com.eg .google.es .google.com.et .google.fi .google.com.fj .google.fm .google.fr .google.ga .google.ge .google.gg .google.com.gh .google.com.gi .google.gl .google.gm .google.gr .google.com.gt .google.gy .google.com.hk .google.hn .google.hr .google.ht .google.hu .google.co.id .google.ie .google.co.il .google.im .google.co.in .google.iq .google.is .google.it .google.je .google.com.jm .google.jo .google.co.jp .google.co.ke .google.com.kh .google.ki .google.kg .google.co.kr .google.com.kw .google.kz .google.la .google.com.lb .google.li .google.lk .google.co.ls .google.lt .google.lu .google.lv .google.com.ly .google.co.ma .google.md .google.me .google.mg .google.mk .google.ml .google.com.mm .google.mn .google.com.mt .google.mu .google.mv .google.mw .google.com.mx .google.com.my .google.co.mz .google.com.na .google.com.ng .google.com.ni .google.ne .google.nl .google.no .google.com.np .google.nr .google.nu .google.co.nz .google.com.om .google.com.pa .google.com.pe .google.com.pg .google.com.ph .google.com.pk .google.pl .google.pn .google.com.pr .google.ps .google.pt .google.com.py .google.com.qa .google.ro .google.ru .google.rw .google.com.sa .google.com.sb .google.sc .google.se .google.com.sg .google.sh .google.si .google.sk .google.com.sl .google.sn .google.so .google.sm .google.sr .google.st .google.com.sv .google.td .google.tg .google.co.th .google.com.tj .google.tl .google.tm .google.tn .google.to .google.com.tr .google.tt .google.com.tw .google.co.tz .google.com.ua .google.co.ug .google.co.uk .google.com.uy .google.co.uz .google.com.vc .google.co.ve .google.co.vi .google.com.vn .google.vu .google.ws .google.rs .google.co.za .google.co.zm .google.co.zw .google.cat"
    .split(" ")
    .map((d) => `https://www${d}`)
    .join(" ");

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.intercom.io https://widget.intercom.io https://js.intercomcdn.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://cdn.segment.com https://ingest.promptwatch.com https://va.vercel-scripts.com https://vercel.live;
  style-src 'self' 'unsafe-inline' https://vercel.live;
  img-src 'self' blob: data: https://cdn.contentport.io https://cdn.bydefault.so https://js.intercomcdn.com https://static.intercomassets.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com https://uploads.intercomusercontent.com https://gifs.intercomcdn.com https://video-messages.intercomcdn.com https://messenger-apps.intercom.io https://messenger-apps.eu.intercom.io https://messenger-apps.au.intercom.io https://*.intercom-attachments.com https://static.intercomassets.eu https://static.au.intercomassets.com https://www.google-analytics.com https://www.googletagmanager.com https://*.google.com https://*.doubleclick.net https://www.googleadservices.com ${googleAdsDomains} https://*.mux.com;
  font-src 'self' https://js.intercomcdn.com https://fonts.intercomcdn.com https://vercel.live https://assets.vercel.com;
  connect-src 'self' https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io https://api-ping.intercom.io https://nexus-websocket-a.intercom.io wss://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-b.intercom.io https://nexus-europe-websocket.intercom.io wss://nexus-europe-websocket.intercom.io https://nexus-australia-websocket.intercom.io wss://nexus-australia-websocket.intercom.io https://uploads.intercomcdn.com https://uploads.intercomcdn.eu https://uploads.au.intercomcdn.com https://uploads.eu.intercomcdn.com https://uploads.intercomusercontent.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://cdn.segment.com https://api.segment.io https://vitals.vercel-insights.com https://*.doubleclick.net https://analytics.google.com https://stats.g.doubleclick.net https://ingest.promptwatch.com https://kg2nsnegmd.execute-api.us-west-1.amazonaws.com https://xsdlzzdyji.execute-api.us-west-2.amazonaws.com https://effbmlt2n4.execute-api.us-east-1.amazonaws.com https://fvj3rll99i.execute-api.eu-west-1.amazonaws.com https://bszkhcn2m7.execute-api.eu-central-1.amazonaws.com https://czphf8wj9b.execute-api.ap-southeast-1.amazonaws.com https://gu1zu8xx11.execute-api.ap-east-1.amazonaws.com https://kuhry6kp4h.execute-api.sa-east-1.amazonaws.com https://um7c15bqnl.execute-api.me-south-1.amazonaws.com https://www.googleadservices.com ${googleAdsDomains} https://vercel.live wss://*.pusher.com https://*.mux.com https://*.litix.io;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://intercom.help https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io;
  frame-src https://vercel.live https://www.googletagmanager.com https://intercom-sheets.com https://www.intercom-reporting.com https://www.youtube.com https://player.vimeo.com https://fast.wistia.net https://*.doubleclick.net;
  worker-src 'self' https://intercom-sheets.com https://www.intercom-reporting.com https://www.youtube.com https://player.vimeo.com https://fast.wistia.net;
  media-src 'self' blob: https://js.intercomcdn.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com https://*.mux.com;
  frame-ancestors 'none';
  manifest-src 'self' https://upstash.com;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://upstash.com",
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.bydefault.so",
      },
      {
        protocol: "https",
        hostname: "cdn.contentport.io",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
    ],
  },
  rewrites: () => [
    {
      source: "/docs",
      destination: "https://upstash.mintlify.dev/docs",
    },
    {
      source: "/docs/:match*",
      destination: "https://upstash.mintlify.dev/docs/:match*",
    },
  ],
  async headers() {
    return [
      {
        // Excludes /docs: those responses are proxied from Mintlify, which
        // needs its own script/style origins that this policy doesn't cover.
        source: "/((?!docs).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
      {
        // Advertise the LLM-friendly index on every page
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value:
              '<https://upstash.com/llms.txt>; rel="alternate"; type="text/plain"; title="LLM-friendly content index"',
          },
        ],
      },
      {
        // Blog HTML responses are content-negotiated against text/markdown,
        // so caches must differentiate by Accept.
        source: "/blog",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      {
        source: "/blog/:slug",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      {
        source: "/pricing/redis",
        headers: [
          {
            key: "Link",
            value:
              '<https://upstash.com/pricing/redis.md>; rel="alternate"; type="text/markdown"; title="Redis Pricing (Markdown)"',
          },
        ],
      },
      {
        source: "/pricing/qstash",
        headers: [
          {
            key: "Link",
            value:
              '<https://upstash.com/pricing/qstash.md>; rel="alternate"; type="text/markdown"; title="QStash Pricing (Markdown)"',
          },
        ],
      },
      {
        source: "/pricing/vector",
        headers: [
          {
            key: "Link",
            value:
              '<https://upstash.com/pricing/vector.md>; rel="alternate"; type="text/markdown"; title="Vector Pricing (Markdown)"',
          },
        ],
      },
      {
        source: "/pricing/workflow",
        headers: [
          {
            key: "Link",
            value:
              '<https://upstash.com/pricing/workflow.md>; rel="alternate"; type="text/markdown"; title="Workflow Pricing (Markdown)"',
          },
        ],
      },
      {
        source: "/pricing/search",
        headers: [
          {
            key: "Link",
            value:
              '<https://upstash.com/pricing/search.md>; rel="alternate"; type="text/markdown"; title="Search Pricing (Markdown)"',
          },
        ],
      },
      {
        source: "/pricing/box",
        headers: [
          {
            key: "Link",
            value:
              '<https://upstash.com/pricing/box.md>; rel="alternate"; type="text/markdown"; title="Box Pricing (Markdown)"',
          },
        ],
      },
    ];
  },
};

module.exports = withContentCollections(nextConfig);
