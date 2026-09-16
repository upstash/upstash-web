# Refresh the Docs7 comparison post

The post is a draft under `abdullahenes`. Its current measurements are from September 16, 2026, after the deployment of the image optimization in [Docs7 PR #340](https://github.com/upstash/docs7/pull/340).

For the next refresh, wait until the renderer is deployed **and both Docs7 documentation sites are rebuilt**. Submit both Docs7 and Mintlify URLs again in the same measurement window. Keep all completed runs and record failed attempts. This script only imports results; it does not run tests.

```sh
node scripts/docs7-benchmark.mjs /path/to/comparison-data.json
pnpm exec prettier --write data/blog/2026-09-16-docs7-vs-mintlify.mdx public/blog/docs7-vs-mintlify/results.json
```

Omit the argument to regenerate from the checked-in data. The source export has `date`, `sites`, `pages`, `hosted`, `contentFindings`, and `attempts`. Only hosted third-party results are exported. The script checks that Google has three included runs per host and device and that Pingdom, GTmetrix, and WebPageTest pairs use the same city.

The article puts four static charts before the detailed tables. The script updates the numeric text, page selection counts, tables, charts, and JSON. `pageTypes` maps source pages to reader-facing content descriptions and content groups. Add a description and group when adding a page. The article combines both documentation projects; source IDs and URLs remain in the data.

The overview medians use one value per page per host. For Google, that input is the page's three-run median. Content charts use the same method within each group. Each provider keeps its own sample size and metric. These aggregates do not measure a typical user's visit and must not be described as field data or percentage speed improvements.

Before publication:

- Check content parity again. SET now has matching response text, options, and examples. LaTeX is excluded because Mintlify displays raw math text while Docs7 renders equations. Do not infer missing content from a snapshot taken before hydration. Update exclusions, service settings, and limits.
- Replace both Google screenshots. Select the video and component catalog page's report whose Performance score equals each host's median. Individual timing metrics need not be medians. Update alt text and keep the report URL, device, and date visible. The PNGs must be direct browser crops of the September 16 reports. The report links are in the desktop table and JSON.
- Review the prose after each refresh, especially which content groups Mintlify leads. Check counts, chart scales, and any ties.
- Preview desktop and mobile. Check all four charts, provider icons, author, tables, image loading, and the data link.
- Update the publication date if needed, remove `draft: true` and the opening editor comment, and mark the PR ready after review.

## Provider images

The graphics embed copies of the providers' own icons. This keeps each SVG self-contained and avoids external image requests. They identify the source of the test; they do not imply endorsement.

- [PageSpeed Insights icon](https://www.gstatic.com/pagespeed/insights/ui/logo/favicon_48.png), linked by the PageSpeed Insights homepage.
- [DebugBear logo](https://www.debugbear.com/public/landing/logo-white-border.svg), used in its homepage navigation.
- [Pingdom favicon](https://tools.pingdom.com/favicon.ico), converted to PNG from the 48 px icon.

The writing follows the direct setup/result structure of [Upstash's Deno benchmark](https://upstash.com/blog/benchmark-with-deno) and the result-first approach of [ClickHouse's ClickStack performance post](https://clickhouse.com/blog/making-clickstack-5x-faster-clickhouse-observability). The measurements and text are our own; the measurements were made by the named external services.

## September 16 sample

Nine route pairs were fixed before tests: a cards-and-code baseline, video and component catalog, nine-screenshot reference, long API reference with 36 code blocks, custom React badge, tabbed guide with five screenshots, Mermaid diagram, LaTeX equations, and expandable API fields. Eight pairs have comparable rendered content. All nine remain in the raw data.

Google uses three runs for each URL and device. DebugBear uses one run per URL and device from US East. Repeated service errors limited its results to five matched mobile pairs and four matched desktop pairs. Two further reports have no matching result from the other host and remain in the download only. Pingdom uses one run from San Francisco. GTmetrix and WebPageTest reached free limits; their one matched pair each is shown separately, outside the overview charts. Do not combine scores from different providers.
