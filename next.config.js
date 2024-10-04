const { withContentlayer } = require("next-contentlayer");

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.posthog.com https://app.intercom.io https://widget.intercom.io https://js.intercomcdn.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://cdn.segment.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://*.posthog.com https://js.intercomcdn.com https://static.intercomassets.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com https://uploads.intercomusercontent.com https://gifs.intercomcdn.com https://video-messages.intercomcdn.com https://messenger-apps.intercom.io https://messenger-apps.eu.intercom.io https://messenger-apps.au.intercom.io https://*.intercom-attachments.com https://static.intercomassets.eu https://static.au.intercomassets.com https://www.google-analytics.com https://www.googletagmanager.com https://*.google.com https://*.doubleclick.net https://www.google.com.tr;
  font-src 'self' https://js.intercomcdn.com https://fonts.intercomcdn.com;
  connect-src 'self' https://*.posthog.com https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io https://api-ping.intercom.io https://nexus-websocket-a.intercom.io wss://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-b.intercom.io https://nexus-europe-websocket.intercom.io wss://nexus-europe-websocket.intercom.io https://nexus-australia-websocket.intercom.io wss://nexus-australia-websocket.intercom.io https://uploads.intercomcdn.com https://uploads.intercomcdn.eu https://uploads.au.intercomcdn.com https://uploads.eu.intercomcdn.com https://uploads.intercomusercontent.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://cdn.segment.com https://api.segment.io https://vitals.vercel-insights.com https://*.doubleclick.net https://analytics.google.com https://stats.g.doubleclick.net;
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
    ];
  },
};

module.exports = withContentlayer(nextConfig);
