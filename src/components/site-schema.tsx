import { SITE_URL } from "@/utils/const";

const SAME_AS = [
  "https://github.com/upstash",
  "https://x.com/upstash",
  "https://www.linkedin.com/company/upstash",
  "https://discord.gg/jUxUYE4nEB",
  "https://www.npmjs.com/org/upstash",
];

/**
 * Site-wide identity structured data (Organization, WebSite,
 * SoftwareApplication) so agents and search engines can tell what upstash.com
 * is, who runs it, and how to reach us.
 */
export default function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Upstash",
        legalName: "Upstash, Inc.",
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo/upstash-icon-white-bg.png`,
        },
        description:
          "Upstash is a serverless data platform providing fully managed Redis, Vector, Search, QStash messaging, Workflow, Box sandboxes and Blob object storage with per-request pricing.",
        email: "support@upstash.com",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@upstash.com",
            url: `${SITE_URL}/contact`,
            availableLanguage: "English",
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "support@upstash.com",
            url: `${SITE_URL}/enterprise`,
            availableLanguage: "English",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressRegion: "CA",
          addressCountry: "US",
        },
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Upstash",
        url: `${SITE_URL}/`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/ask?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#application`,
        name: "Upstash",
        url: `${SITE_URL}/`,
        description:
          "Serverless Redis, Vector, Search, QStash, Workflow, Box and Blob. Create a database in seconds, connect over HTTP from any runtime, and pay per request with a free tier to start.",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        provider: { "@id": `${SITE_URL}/#organization` },
        softwareHelp: `${SITE_URL}/docs`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description:
            "Free tier on every product; pay-as-you-go and fixed monthly plans beyond that.",
          url: `${SITE_URL}/pricing/redis`,
        },
        sameAs: SAME_AS,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
