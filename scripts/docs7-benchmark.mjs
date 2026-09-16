// Update the blog from the existing benchmark export. This runs no benchmarks.
// node scripts/docs7-benchmark.mjs /path/to/comparison-data.json
// Without an argument, regenerate from the checked-in third-party results.
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const asset = (name) => new URL(`public/blog/docs7-vs-mintlify/${name}`, root);
const postFile = new URL("data/blog/2026-09-16-docs7-vs-mintlify.mdx", root);
const input = JSON.parse(
  readFileSync(process.argv[2] ?? asset("results.json"), "utf8"),
);
const providers = ["google", "debugbear", "pingdom", "gtmetrix", "webpagetest"];
const excludedPages = input.contentFindings ?? [];
const sourceRows = input.hosted ?? input.results;
assert(
  sourceRows.every((r) => providers.includes(r.provider)),
  "Unexpected provider",
);
const pages = input.pages.filter(
  (p) => !excludedPages.some((e) => e.project === p.project && e.page === p.id),
);
const names = { upstash: "Upstash", context7: "Context7" };
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};
const rows = (provider, page, device, site) =>
  sourceRows.filter(
    (r) =>
      r.provider === provider &&
      r.project === page.project &&
      r.page === page.id &&
      r.device === device &&
      r.site === site &&
      r.comparisonEligible !== false,
  );
const comparisons = (provider, device) =>
  pages.flatMap((p) => {
    const hosts = ["docs7", "mintlify"].map((site) =>
      rows(provider, p, device, site),
    );
    if (hosts.some((runs) => runs.length === 0)) {
      return [];
    }
    if (provider === "google") {
      assert(
        hosts.every((runs) => runs.length === 3),
        "Google needs three runs per host",
      );
    }
    if (provider === "pingdom") {
      assert.equal(
        hosts[0][0].location,
        hosts[1][0].location,
        "Pingdom cities must match",
      );
    }
    const key = provider === "pingdom" ? "loadMs" : "score";
    const results = hosts.map((runs) => {
      const value = median(runs.map((r) => r[key]));
      assert(Number.isFinite(value));
      const representative = runs.find((r) => r[key] === value);
      assert(representative, "Median must correspond to a recorded run");
      return {
        value,
        min: Math.min(...runs.map((r) => r[key])),
        max: Math.max(...runs.map((r) => r[key])),
        reportUrl: representative.reportUrl,
      };
    });
    const [d, m] = results.map((r) => r.value);
    const winner =
      d === m
        ? "tie"
        : (provider === "pingdom" ? d < m : d > m)
          ? "docs7"
          : "mintlify";
    return [
      {
        project: p.project,
        page: p.id,
        label: p.label,
        path: p.path,
        provider,
        device,
        results,
        winner,
      },
    ];
  });
const mobile = comparisons("google", "mobile");
const desktop = comparisons("google", "desktop");
assert.equal(mobile.length, pages.length);
assert.equal(desktop.length, pages.length);
const debugbear = comparisons("debugbear", "mobile");
const pingdom = comparisons("pingdom", "desktop");
const wins = (list) => list.filter((r) => r.winner === "docs7").length;
const all = [...mobile, ...desktop, ...debugbear, ...pingdom];
writeFileSync(
  asset("results.json"),
  `${JSON.stringify(
    {
      date: input.date,
      sites: input.sites,
      pages: input.pages,
      contentFindings: excludedPages,
      notes: [
        "Third-party hosted tests only. No local Lighthouse or HTTP measurements are included.",
        "Google uses three completed runs per URL and device; comparisons use medians. Timing values were transcribed from Google's score-calculator links; CLS there is rounded to two decimals.",
        "DebugBear uses one run per URL with its own settings; its Lighthouse scores are not pooled with Google's.",
        "Pingdom pairs use the same city. The unmatched initial Claim a library runs remain in results with comparisonEligible=false.",
        "These are initial page loads of deployed sites with their integrations, not a controlled comparison of rendering engines. CDN cache state was not controlled.",
        "GTmetrix and WebPageTest have insufficient matched coverage for the article's summary.",
      ],
      comparisons: all,
      results: sourceRows,
      attempts: input.attempts,
    },
    null,
    2,
  )}\n`,
);

const scoreLinks = (r) =>
  r.results
    .map((result, i) => {
      const link = `[${result.value}](${result.reportUrl})`;
      return r.winner === ["docs7", "mintlify"][i] ? `**${link}**` : link;
    })
    .join(" / ");
const pageLink = (r) =>
  `[${r.label}](${input.sites[r.project].docs7}${r.path})`;
const tables = ["context7", "upstash"]
  .map((project) => {
    const lines = [
      `### ${names[project]}`,
      "",
      "| Page | Mobile | Desktop |",
      "| --- | ---: | ---: |",
    ];
    for (const m of mobile.filter((r) => r.project === project)) {
      const d = desktop.find((r) => r.project === project && r.page === m.page);
      lines.push(`| ${pageLink(m)} | ${scoreLinks(m)} | ${scoreLinks(d)} |`);
    }
    return lines.join("\n");
  })
  .join("\n\n");
const serviceTable = (list, metric) =>
  [
    `| Page | ${metric} · Docs7 / Mintlify |`,
    "| --- | ---: |",
    ...list.map(
      (r) => `| ${names[r.project]} · ${pageLink(r)} | ${scoreLinks(r)} |`,
    ),
  ].join("\n");
const find = (list, project, page) => {
  const result = list.find((r) => r.project === project && r.page === page);
  assert(result, `Missing ${project}/${page}`);
  return result;
};
const workflow = find(desktop, "upstash", "workflow");
const introduction = find(desktop, "upstash", "introduction");
const react = find(mobile, "context7", "react-components");
const introLoad = find(pingdom, "upstash", "introduction");
const workflowLoad = find(pingdom, "upstash", "workflow");
const losses = (list) =>
  new Intl.ListFormat("en", { type: "conjunction" }).format(
    list
      .filter((r) => r.winner === "mintlify")
      .map((r) => `${names[r.project]}'s ${r.label} page`),
  );
const testDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
}).format(new Date(`${input.date}T00:00:00Z`));
const exclusion = excludedPages.length
  ? `We excluded ${excludedPages.map((e) => input.pages.find((p) => p.project === e.project && p.id === e.page).label).join(", ")} because of a content mismatch, leaving ${pages.length} page pairs in the tables and win counts.`
  : `All ${pages.length} page pairs are included in the tables and win counts.`;
const blocks = {
  lead: `**Docs7 won ${wins(mobile) + wins(desktop)} of ${mobile.length + desktop.length} Google PageSpeed comparisons.** It led on ${wins(mobile)} of ${mobile.length} pages on mobile and ${wins(desktop)} of ${desktop.length} on desktop, using the median of three runs for each result.`,
  "google-intro": `We collected ${sourceRows.filter((r) => r.provider === "google").length} Google results across ${input.pages.length} page pairs, two hosts, two device modes, and three runs. ${exclusion}`,
  "test-date": `The test date is **${testDate}**. We used the direct hosted URLs for each platform:`,
  "google-tables": tables,
  "google-detail": `The Upstash overview scored **${introduction.results[0].value} against ${introduction.results[1].value}** on desktop. Workflow scored **${workflow.results[0].value} against ${workflow.results[1].value}**. On mobile, the custom React component page scored **${react.results[0].value} against ${react.results[1].value}**.\n\nMintlify led on ${losses(mobile)} on mobile. On desktop, it led on ${losses(desktop)}. Those results are in the same tables.`,
  "other-results": `Docs7 also led in **${wins(debugbear)} of ${debugbear.length} completed DebugBear pairs**, and loaded faster in **${wins(pingdom)} of ${pingdom.length} Pingdom pairs**.`,
  "debugbear-table": `### DebugBear mobile scores\n\n${serviceTable(debugbear, "Score / 100")}`,
  "pingdom-table": `### Pingdom load times\n\n${serviceTable(pingdom, "Milliseconds")}`,
  "pingdom-detail": `Pingdom measured the Upstash overview at **${introLoad.results[0].value} ms on Docs7 and ${introLoad.results[1].value.toLocaleString("en-US")} ms on Mintlify**, or **${Math.round((1 - introLoad.results[0].value / introLoad.results[1].value) * 100)}% less load time**. Workflow went the other way: **${workflowLoad.results[0].value} ms for Docs7 and ${workflowLoad.results[1].value} ms for Mintlify**. A Google score and a Pingdom load time answer different questions, so I have kept both.`,
};
let post = readFileSync(postFile, "utf8");
for (const [key, content] of Object.entries(blocks)) {
  const start = `{/* benchmark:${key}:start */}`;
  const end = `{/* benchmark:${key}:end */}`;
  assert(post.includes(start) && post.includes(end), `Missing markers: ${key}`);
  post = `${post.slice(0, post.indexOf(start) + start.length)}\n\n${content}\n\n${post.slice(post.indexOf(end))}`;
}
writeFileSync(postFile, post);

// Each row has its own denominator. The graphic does not pool different tools.
const rowsToDraw = [
  ["Google · mobile", mobile],
  ["Google · desktop", desktop],
  ["DebugBear · mobile", debugbear],
  ["Pingdom · load time", pingdom],
];
const orange = "#e86824";
const green = "#087d56";
const svg = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="560" viewBox="0 0 1000 560" role="img" aria-labelledby="title desc">
<title id="title">Docs7 wins most of the page comparisons</title>
<desc id="desc">${rowsToDraw.map(([label, list]) => `${label}: Docs7 ${wins(list)} of ${list.length}`).join(". ")}. Different settings and sample sizes per service. Google uses median scores from three runs. SET excluded.</desc>
<rect width="1000" height="560" fill="#faf9f6"/>
<g font-family="Arial, Helvetica, sans-serif" fill="#202426">
<text x="48" y="58" font-size="14" letter-spacing="2">DOCS7 VS. MINTLIFY</text>
<text x="48" y="108" font-size="34" font-weight="700">Pages won, by testing service</text>
<text x="48" y="142" font-size="16" fill="#60686c">Upstash + Context7 · ${input.date} · initial page loads</text>
<circle cx="62" cy="183" r="7" fill="${orange}"/><text x="78" y="189" font-size="16">Docs7</text>
<circle cx="176" cy="183" r="7" fill="${green}"/><text x="192" y="189" font-size="16">Mintlify</text>`,
];
for (const [[label, list], i] of rowsToDraw.map((row, i) => [row, i])) {
  const d = wins(list);
  const m = list.filter((r) => r.winner === "mintlify").length;
  const width = 455;
  const y = 228 + i * 64;
  svg.push(`<text x="48" y="${y + 23}" font-size="17">${label}</text>
<rect x="280" y="${y}" width="${width}" height="36" fill="#deded9"/>
<rect x="280" y="${y}" width="${(width * d) / list.length}" height="36" fill="${orange}"/>
<rect x="${280 + (width * d) / list.length}" y="${y}" width="${(width * m) / list.length}" height="36" fill="${green}"/>
<text x="762" y="${y + 25}" font-size="25" font-weight="700">${d} / ${list.length}</text>
<text x="886" y="${y + 24}" font-size="14" fill="#60686c">Docs7</text>`);
}
svg.push(
  `<text x="48" y="524" font-size="14" fill="#60686c">Google: median of 3. Other services: 1 matched run. SET excluded.</text></g></svg>`,
);
writeFileSync(asset("wins.svg"), svg.join("\n"));
console.log(
  `Updated ${fileURLToPath(postFile)} and third-party results. Google: ${wins(mobile) + wins(desktop)}/${mobile.length + desktop.length}; DebugBear: ${wins(debugbear)}/${debugbear.length}; Pingdom: ${wins(pingdom)}/${pingdom.length}.`,
);
