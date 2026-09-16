# Refresh the Docs7 comparison post

The post is a draft under `abdullahenes`. Its current measurements are from September 15, 2026, before the image optimization in [Docs7 PR #340](https://github.com/upstash/docs7/pull/340).

Use the existing Docs7 benchmark process to collect a new set after the renderer is deployed **and both Docs7 documentation sites are rebuilt**. Submit both Docs7 and Mintlify URLs again in the same measurement window. Keep all completed runs and record failed attempts. This script only imports results; it does not run tests.

```sh
node scripts/docs7-benchmark.mjs /path/to/comparison-data.json
pnpm exec prettier --write data/blog/2026-09-16-docs7-vs-mintlify.mdx public/blog/docs7-vs-mintlify/results.json
```

To regenerate from the checked-in data, omit the argument. The input is the existing comparison export with `date`, `sites`, `pages`, `hosted`, `contentFindings`, and `attempts`. Only hosted third-party results are exported. The script updates the marked numeric paragraphs, tables, test date, chart, and JSON. It checks that Google has three runs per host and device and that Pingdom comparisons use the same city.

Before publication:

- Check content parity again, including SET. Update exclusions in the source export. Update the prose that explains exclusions and each service's settings and test limits.
- Replace both Google screenshots. Select the Workflow report whose Performance score equals each host's median; the individual timing metrics need not be medians. Update screenshot alt text and keep the report URL, device, and date visible. The current PNGs are direct browser screenshot crops, captured September 16 from the saved September 15 reports. Their source report links are the Workflow desktop cells in the table and JSON.
- Read every result claim again. In particular, the prose and chart title assume Docs7 wins most comparisons; the Pingdom example assumes Mintlify wins Workflow. Change the text if the new data changes those outcomes. Inspect any ties in the chart.
- Preview the post on desktop and mobile. Check author, tables, screenshots, graph, and data link.
- Update the publication date if needed, remove `draft: true` and the opening editor comment, and mark the PR ready after the results are reviewed.

The writing follows the direct setup/result structure of [Upstash's Deno benchmark](https://upstash.com/blog/benchmark-with-deno) and the result-first approach of [ClickHouse's ClickStack performance post](https://clickhouse.com/blog/making-clickstack-5x-faster-clickhouse-observability). The measurements and text in this post are our own; the measurements were made by the named external services.
