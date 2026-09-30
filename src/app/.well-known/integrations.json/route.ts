import { SITE_URL } from "@/utils/const";

export const dynamic = "force-static";

// integrations.sh owner declaration (v3), read by the registry that Executor
// and other agent gateways list integrations from. Schema:
// https://github.com/UsefulSoftwareCo/integrations/blob/main/src/lib/discovery-schema.ts
//
// The registry matches a declared surface to its existing entry by url, so
// keep the urls of already-listed surfaces unchanged or they show up twice.
const source = `${SITE_URL}/.well-known/integrations.json`;
const basis = { via: "declared", source } as const;

const header = (id: string, scheme: string) => ({
  use: [
    {
      id,
      mechanics: {
        source: "http",
        in: "header",
        headerName: "Authorization",
        scheme,
      },
    },
  ],
  basis,
});

const query = (id: string, paramName: string) => ({
  use: [{ id, mechanics: { source: "http", in: "query", paramName } }],
  basis,
});

export function GET() {
  const declaration = {
    version: 3,
    summary:
      "Upstash exposes a remote MCP server for managing Redis, QStash, Workflow, Vector, Search, Box and Blob, plus REST APIs for the Developer API, Redis, QStash, Vector and Search.",
    credentials: {
      upstash_oauth: {
        type: "oauth2",
        label: "Upstash account (OAuth)",
        setup:
          "MCP clients register themselves (dynamic client registration) and open a consent page where you pick the account scope (personal or a team) and whether the connection is read-only. Grants can be revoked in the [Upstash Console](https://console.upstash.com/account/oauth-clients) under Account → OAuth Clients.",
      },
      upstash_dev_api_key: {
        type: "basic",
        label: "Upstash Developer API credentials (account email + API key)",
        generateUrl: "https://console.upstash.com/account/api",
        setup:
          "Create an API key on the [Upstash Console API Keys page](https://console.upstash.com/account/api). Use your account email as the username and the API key as the password.",
        fields: {
          email: { description: "Upstash account email" },
          api_key: { secret: true, description: "Developer API key" },
        },
      },
      upstash_redis_rest_token: {
        type: "bearer",
        label: "Upstash Redis REST token",
        setup:
          "Open a database in the [Upstash Console](https://console.upstash.com/redis) and copy the `HTTPS` endpoint and `Token` (or `Readonly Token`) from the connection details.",
      },
      upstash_qstash_token: {
        type: "bearer",
        label: "Upstash QStash token",
        generateUrl: "https://console.upstash.com/qstash",
        setup:
          "Copy `QSTASH_TOKEN` from the [QStash page](https://console.upstash.com/qstash) in the Upstash Console.",
      },
      upstash_vector_rest_token: {
        type: "bearer",
        label: "Upstash Vector REST token",
        setup:
          "Open an index in the [Upstash Console](https://console.upstash.com/vector) and copy `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN` from the Connect section.",
      },
      upstash_search_rest_token: {
        type: "bearer",
        label: "Upstash Search REST token",
        setup:
          "Open a Search database in the [Upstash Console](https://console.upstash.com/search) and copy `UPSTASH_SEARCH_REST_URL` and `UPSTASH_SEARCH_REST_TOKEN`.",
      },
    },
    surfaces: [
      {
        slug: "upstash-mcp-server",
        name: "Upstash MCP Server",
        type: "mcp",
        url: "https://mcp.upstash.com/mcp",
        transports: ["streamable-http"],
        docs: `${SITE_URL}/docs/agent-resources/mcp`,
        notes:
          "Append `?features=` with any of redis, qstash_workflow, vector_search, box, blob to limit the tools; omitted means all.",
        basis,
        auth: {
          status: "required",
          entries: [
            {
              use: [{ id: "upstash_oauth", mechanics: { source: "well-known" } }],
              basis,
            },
            header("upstash_dev_api_key", "Basic"),
          ],
        },
      },
      {
        slug: "upstash-developer-api",
        name: "Upstash Developer API",
        type: "http",
        url: "https://api.upstash.com/v2",
        docs: `${SITE_URL}/docs/devops/developer-api/introduction`,
        basis,
        auth: {
          status: "required",
          entries: [header("upstash_dev_api_key", "Basic")],
        },
      },
      {
        slug: "upstash-redis-rest-api",
        name: "Upstash Redis REST API",
        type: "http",
        url: "https://<db-host>.upstash.io",
        docs: `${SITE_URL}/docs/redis/features/restapi`,
        variables: [
          {
            name: "db-host",
            resolveFrom:
              "The HTTPS endpoint in the database's connection details in the Upstash Console.",
            description: "Per-database REST host, e.g. `us1-merry-cat-32748.upstash.io`.",
          },
        ],
        basis,
        auth: {
          status: "required",
          entries: [
            header("upstash_redis_rest_token", "Bearer"),
            query("upstash_redis_rest_token", "_token"),
          ],
        },
      },
      {
        slug: "upstash-qstash-api",
        name: "Upstash QStash API",
        type: "http",
        url: "https://qstash.upstash.io/v2",
        docs: `${SITE_URL}/docs/qstash/api/authentication`,
        basis,
        auth: {
          status: "required",
          entries: [
            header("upstash_qstash_token", "Bearer"),
            query("upstash_qstash_token", "qstash_token"),
          ],
        },
      },
      {
        slug: "upstash-vector-rest-api",
        name: "Upstash Vector REST API",
        type: "http",
        url: "<UPSTASH_VECTOR_REST_URL>",
        docs: `${SITE_URL}/docs/vector/api/get-started`,
        variables: [
          {
            name: "UPSTASH_VECTOR_REST_URL",
            resolveFrom: "The Connect section of the index in the Upstash Console.",
            description: "Per-index REST base URL.",
          },
        ],
        basis,
        auth: {
          status: "required",
          entries: [header("upstash_vector_rest_token", "Bearer")],
        },
      },
      {
        slug: "upstash-search-api",
        name: "Upstash Search API",
        type: "http",
        url: "<UPSTASH_SEARCH_REST_URL>",
        docs: `${SITE_URL}/docs/search/overall/getstarted`,
        variables: [
          {
            name: "UPSTASH_SEARCH_REST_URL",
            resolveFrom: "The connection details of the Search database in the Upstash Console.",
            description: "Per-database Search REST base URL.",
          },
        ],
        basis,
        auth: {
          status: "required",
          entries: [header("upstash_search_rest_token", "Bearer")],
        },
      },
    ],
  };

  return Response.json(declaration, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
