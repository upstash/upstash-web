import { SITE_URL } from "@/utils/const";

export const dynamic = "force-static";

// RFC 9727 API catalog: lets agents discover the OpenAPI description and
// human/LLM documentation for this host from a well-known location.
export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${SITE_URL}/`,
        "service-desc": [
          {
            href: `${SITE_URL}/docs/devops/developer-api/openapi.yaml`,
            type: "application/openapi+yaml",
          },
        ],
        "service-doc": [
          { href: `${SITE_URL}/llms.txt`, type: "text/plain" },
          { href: `${SITE_URL}/docs`, type: "text/html" },
        ],
      },
      // Product REST APIs, documented (and specced) in the docs.
      {
        anchor: `${SITE_URL}/docs/qstash`,
        "service-desc": [
          {
            href: `${SITE_URL}/docs/qstash/openapi.yaml`,
            type: "application/openapi+yaml",
          },
        ],
        "service-doc": [{ href: `${SITE_URL}/docs/qstash`, type: "text/html" }],
      },
      {
        anchor: `${SITE_URL}/docs/workflow`,
        "service-desc": [
          {
            href: `${SITE_URL}/docs/workflow/openapi.yaml`,
            type: "application/openapi+yaml",
          },
        ],
        "service-doc": [
          { href: `${SITE_URL}/docs/workflow`, type: "text/html" },
        ],
      },
    ],
  };

  return Response.json(catalog, {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
    },
  });
}
