const { withContentCollections } = require("@content-collections/next");

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.intercom.io https://widget.intercom.io https://js.intercomcdn.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://cdn.segment.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://cdn.contentport.io https://cdn.bydefault.so https://js.intercomcdn.com https://static.intercomassets.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com https://uploads.intercomusercontent.com https://gifs.intercomcdn.com https://video-messages.intercomcdn.com https://messenger-apps.intercom.io https://messenger-apps.eu.intercom.io https://messenger-apps.au.intercom.io https://*.intercom-attachments.com https://static.intercomassets.eu https://static.au.intercomassets.com https://www.google-analytics.com https://www.googletagmanager.com https://*.google.com https://*.doubleclick.net https://www.google.com.tr;
  font-src 'self' https://js.intercomcdn.com https://fonts.intercomcdn.com;
  connect-src 'self' https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io https://api-ping.intercom.io https://nexus-websocket-a.intercom.io wss://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-b.intercom.io https://nexus-europe-websocket.intercom.io wss://nexus-europe-websocket.intercom.io https://nexus-australia-websocket.intercom.io wss://nexus-australia-websocket.intercom.io https://uploads.intercomcdn.com https://uploads.intercomcdn.eu https://uploads.au.intercomcdn.com https://uploads.eu.intercomcdn.com https://uploads.intercomusercontent.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://cdn.segment.com https://api.segment.io https://vitals.vercel-insights.com https://*.doubleclick.net https://analytics.google.com https://stats.g.doubleclick.net;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://intercom.help https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io;
  frame-src https://intercom-sheets.com https://www.intercom-reporting.com https://www.youtube.com https://player.vimeo.com https://fast.wistia.net https://*.doubleclick.net;
  worker-src 'self' https://intercom-sheets.com https://www.intercom-reporting.com https://www.youtube.com https://player.vimeo.com https://fast.wistia.net;
  media-src https://js.intercomcdn.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com;
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
    { source: "/pricing", destination: "/pricing/redis" },
    {
      source: "/docs/:match*",
      destination: "https://upstash.mintlify.dev/docs/:match*",
    },
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
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
