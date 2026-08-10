# Upstash

## Blog Post Features

---

#### Note

![](public/readme/note-default.png)

```mdx
<Note>You can use any Redis® client, but we recommend @upstash/redis</Note>
```

![](public/readme/note-info.png)

```mdx
<Note type="info">
  You can use any Redis® client, but we recommend @upstash/redis
</Note>
```

![](public/readme/note-tip.png)

```mdx
<Note type="tip">
  You can use any Redis® client, but we recommend @upstash/redis
</Note>
```

![](public/readme/note-caution.png)

```mdx
<Note type="caution">
  You can use any Redis® client, but we recommend @upstash/redis
</Note>
```

![](public/readme/note-danger.png)

```mdx
<Note type="danger">
  You can use any Redis® client, but we recommend @upstash/redis
</Note>
```

![](public/readme/note-custom-title.png)

```mdx
<Note title="custom">
  You can use any Redis® client, but we recommend @upstash/redis
</Note>
<Note title="custom" danger>
  You can use any Redis® client, but we recommend @upstash/redis
</Note>
```

---

#### Code Block

![](public/readme/code-title.png)

````mdx
```javascript title:"pages/api/hello.ts"
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';
```
````

![](public/readme/code-showLineNumber.png)

````mdx
```javascript:pages/api/hello.ts showLineNumbers {5-8,12}
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis'
```
````

---

#### Tags

Tags group posts under `/blog/tag/<tag>`. Conventions:

- Always use **lowercase kebab-case** in frontmatter: `aws-lambda`, not
  `AWS Lambda` or `awslambda`. Don't wrap tags in quotes.
- Tag matching is case- and whitespace-insensitive (via `normalizeTag` in
  `src/utils/tags.ts`), so `Vector`, `vector`, `semantic search` and
  `semantic-search` resolve to the same page — but please write the
  normalized form so counts and the popular-tag row dedupe correctly.
- Add every topic that applies. An article about Upstash Redis Search
  should include both `redis` and `search`, so it surfaces under
  `/blog/tag/redis` **and** `/blog/tag/search`. Posts that are about
  semantic search must carry both `search` and `semantic-search`.
- Display labels for multi-word or acronym tags live in `TAG_NAMES`
  (`src/utils/const.ts`). If you introduce a new multi-word tag, add
  an entry so the pill row renders it nicely (e.g. `"feature-flags":
  "Feature Flags"`). Single-word tags fall back to CSS `capitalize`.

```mdx
---
title: "A First Look at Upstash Redis Search"
slug: first-look-at-upstash-redis-search
authors: [josh]
tags: [redis, search]
---
```

**Canonical tag names** (use these; don't invent variants):

| Canonical | Avoid |
| --- | --- |
| `ratelimit` | `rate-limiting`, `ratelimiting`, `rate-limit`, `ratelimiter` |
| `nextjs` | `next.js`, `NextJS` |
| `aws-lambda` | `awslambda`, `lambda` |
| `sveltekit` | `svelte-kit` |
| `nuxt` | `nuxtjs` |
| `announcement` | `announce` |
| `webhook` | `webhooks` |
| `scheduler` | `schedule`, `scheduling` |
| `connectors` | `connector` |
| `cache` | `caching` (keep `semantic-cache` as its own tag) |
| `authentication` | `authenticatio` |
| `feature-flags` | `feature, flag` (two separate tags) |
| `environment-variables` | `environment, variable, env` |
| `search`, `semantic-search` | single-worded `semantic` alone |

If you ever need to re-run the consolidation (e.g. after importing
external posts), `scripts/consolidate-blog-tags.mjs` is idempotent —
it rewrites `tags: [...]` in every `data/blog/*.mdx` according to the
rules above.

