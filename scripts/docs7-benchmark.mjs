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

// Describe the content readers will see, rather than internal page titles.
const pageTypes = {
  "context7/overview": ["Cards and code", "Custom components"],
  "context7/entra-sso": ["Screenshot walkthrough", "Images"],
  "context7/all-clients": [
    "Long guide with accordions",
    "Long guides and steps",
  ],
  "context7/claiming-libraries": [
    "Tabbed setup guide",
    "Long guides and steps",
  ],
  "context7/react-components": ["Custom React component", "Custom components"],
  "context7/mermaid": ["Generated diagrams", "Diagrams and equations"],
  "context7/latex": ["Math equations", "Diagrams and equations"],
  "context7/get-context": [
    "API fields and examples",
    "Code and API references",
  ],
  "upstash/introduction": ["Custom landing page", "Custom components"],
  "upstash/workflow": ["Video and component catalog", "Video"],
  "upstash/metrics": ["Screenshot reference", "Images"],
  "upstash/restapi": ["Long API reference", "Code and API references"],
  "upstash/filtering": ["Tabbed code examples", "Code and API references"],
  "upstash/set": ["Expandable API fields", "Code and API references"],
  "upstash/schedules": ["Code groups and callouts", "Code and API references"],
  "upstash/eviction": ["Image in a frame", "Images"],
};
const contentType = (r) => {
  const value = pageTypes[`${r.project}/${r.page ?? r.id}`];
  assert(value, `Describe the new page: ${r.project}/${r.page ?? r.id}`);
  return value;
};
const groupNames = [
  "Images",
  "Video",
  "Long guides and steps",
  "Code and API references",
  "Custom components",
  "Diagrams and equations",
];
const scoreLinks = (r) =>
  r.results
    .map((result, i) => {
      const link = `[${result.value}](${result.reportUrl})`;
      return r.winner === ["docs7", "mintlify"][i] ? `**${link}**` : link;
    })
    .join(" / ");
const pageLink = (r) =>
  `[${contentType(r)[0]}](${input.sites[r.project].docs7}${r.path})`;
const ordered = (list) =>
  groupNames.flatMap((group) =>
    list.filter((r) => contentType(r)[1] === group),
  );
const tables = [
  "| Page content | Mobile | Desktop |",
  "| --- | ---: | ---: |",
  ...ordered(mobile).map((m) => {
    const d = desktop.find((r) => r.project === m.project && r.page === m.page);
    return `| ${pageLink(m)} | ${scoreLinks(m)} | ${scoreLinks(d)} |`;
  }),
].join("\n");
const serviceTable = (list, metric) =>
  [
    `| Page content | ${metric} · Docs7 / Mintlify |`,
    "| --- | ---: |",
    ...ordered(list).map((r) => `| ${pageLink(r)} | ${scoreLinks(r)} |`),
  ].join("\n");
const typical = (list) =>
  [0, 1].map((i) => median(list.map((r) => r.results[i].value)));
const [mobileD, mobileM] = typical(mobile);
const [desktopD, desktopM] = typical(desktop);
const [pingdomD, pingdomM] = typical(pingdom);
const testDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
}).format(new Date(`${input.date}T00:00:00Z`));
const exclusions = excludedPages.length
  ? `We excluded ${excludedPages.length} page pair because the content did not match. The download retains its results and the reason for exclusion.`
  : "All page pairs are included.";
const blocks = {
  lead: `**Docs7 won ${wins(mobile) + wins(desktop)} of ${mobile.length + desktop.length} Google PageSpeed comparisons.** It also led in ${wins(debugbear)} of ${debugbear.length} DebugBear pairs and loaded faster in ${wins(pingdom)} of ${pingdom.length} Pingdom pairs.`,
  "typical-results": `Across the tested pages, Google's median score was **${mobileD} vs. ${mobileM} on mobile** and **${desktopD} vs. ${desktopM} on desktop**, both in Docs7's favor. Pingdom's median load time was **${pingdomD} ms vs. ${pingdomM.toLocaleString("en-US")} ms**. These are medians across pages, not a claim that every page improved by the same amount.`,
  "page-selection": groupNames
    .map((group) => {
      const count = pages.filter((p) => contentType(p)[1] === group).length;
      const reason = {
        Images:
          "Screenshots and framed images add downloads and can move the layout as they load.",
        Video:
          "An embedded player and a component catalog add more than text to the initial load.",
        "Long guides and steps":
          "Long text, accordions, tabs, and setup steps test a larger document.",
        "Code and API references":
          "Code highlighting, tabbed examples, API fields, and callouts add rendering work.",
        "Custom components":
          "Cards and custom React components test JavaScript and component rendering.",
        "Diagrams and equations":
          "Mermaid and LaTeX need specialist rendering libraries.",
      }[group];
      return `- **${group}, ${count} ${count === 1 ? "page" : "pages"}.** ${reason}`;
    })
    .join("\n"),
  "test-date": `We tested on **${testDate}**, using the direct Docs7 and Mintlify hosted URLs. We selected ${input.pages.length} page pairs from the Upstash and Context7 documentation, with ${pages.length} pairs included in this post. ${exclusions}`,
  "google-tables": tables,
  "debugbear-table": serviceTable(debugbear, "Score / 100"),
  "pingdom-table": serviceTable(pingdom, "Milliseconds"),
};
let post = readFileSync(postFile, "utf8");
for (const [key, content] of Object.entries(blocks)) {
  const start = `{/* benchmark:${key}:start */}`;
  const end = `{/* benchmark:${key}:end */}`;
  assert(post.includes(start) && post.includes(end), `Missing markers: ${key}`);
  post = `${post.slice(0, post.indexOf(start) + start.length)}\n\n${content}\n\n${post.slice(post.indexOf(end))}`;
}
writeFileSync(postFile, post);

// Static SVG charts. Each provider keeps its own metric and test population.
const orange = "#e86824";
const green = "#087d56";
const orangeText = "#b84a0b";
const gray = "#667075";
const icon = (provider, x, y) => {
  const extension = provider === "debugbear" ? "svg" : "png";
  const mime = extension === "svg" ? "image/svg+xml" : "image/png";
  const data = readFileSync(asset(`${provider}.${extension}`)).toString(
    "base64",
  );
  return `<image href="data:${mime};base64,${data}" x="${x}" y="${y}" width="28" height="28"/>`;
};
const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
const text = (
  x,
  y,
  value,
  size = 20,
  color = "#202426",
  weight = 400,
  anchor = "start",
) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}">${escapeXml(value)}</text>`;
const legend =
  () => `<circle cx="40" cy="116" r="7" fill="${orange}"/>${text(56, 123, "Docs7")}
<circle cx="174" cy="116" r="7" fill="${green}"/>${text(190, 123, "Mintlify")}`;
const chart = (name, title, subtitle, height, body, footnotes, description) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="${height}" viewBox="0 0 640 ${height}" role="img" aria-labelledby="title desc">
<title id="title">${escapeXml(title)}</title><desc id="desc">${escapeXml(description)}</desc>
<rect width="640" height="${height}" fill="#faf9f6"/>
<g font-family="Arial, Helvetica, sans-serif">
${text(32, 48, title, 30, "#202426", 700)}
${text(32, 79, subtitle, 18, gray)}
${legend()}
${body}
${footnotes.map((line, i) => text(32, height - 45 + i * 24, line, 16, gray)).join("\n")}
</g></svg>`;
  writeFileSync(asset(name), svg);
};
const services = [
  { label: "PageSpeed Insights · mobile", provider: "google", list: mobile },
  { label: "PageSpeed Insights · desktop", provider: "google", list: desktop },
  { label: "DebugBear · mobile", provider: "debugbear", list: debugbear },
  { label: "Pingdom · load time", provider: "pingdom", list: pingdom },
];
chart(
  "wins.svg",
  "Who won more pages?",
  "Page comparisons won in each hosted test",
  650,
  services
    .map(({ label, provider, list }, i) => {
      const y = 160 + i * 105;
      const d = wins(list);
      const m = list.filter((r) => r.winner === "mintlify").length;
      const ties = list.length - d - m;
      return `${icon(provider, 32, y - 3)}${text(72, y + 19, label, 21, "#202426", 700)}
${text(520, y + 20, d, 27, orangeText, 700, "end")}${text(595, y + 20, m, 27, green, 700, "end")}
<rect x="32" y="${y + 36}" width="576" height="24" fill="#deded9"/>
<rect x="32" y="${y + 36}" width="${(576 * d) / list.length}" height="24" fill="${orange}"/>
<rect x="${32 + (576 * d) / list.length}" y="${y + 36}" width="${(576 * m) / list.length}" height="24" fill="${green}"/>
${text(32, y + 83, `${list.length} matched page pairs${ties ? ` · ${ties} ties shown in gray` : ""}`, 17, gray)}`;
    })
    .join("\n"),
  [
    "Google: 3 runs per URL. Other services: 1 matched run.",
    `${input.date} · ${excludedPages.length ? "Content mismatch excluded." : "All pairs included."}`,
  ],
  services
    .map(
      ({ label, list }) =>
        `${label}: Docs7 ${wins(list)}, Mintlify ${list.filter((r) => r.winner === "mintlify").length}, from ${list.length} pairs.`,
    )
    .join(" "),
);
const pairedBars = (values, y, max, suffix = "") =>
  values
    .map((value, i) => {
      const width = (470 * value) / max;
      const row = y + i * 35;
      return `<rect x="32" y="${row}" width="470" height="23" fill="#eeede8"/>
<rect x="32" y="${row}" width="${width}" height="23" fill="${i === 0 ? orange : green}"/>
${text(608, row + 20, `${value.toLocaleString("en-US")}${suffix}`, 23, i === 0 ? orangeText : green, 700, "end")}`;
    })
    .join("\n");
chart(
  "typical-results.svg",
  "How large was the gap?",
  "Median result across each service's tested pages",
  825,
  services
    .map(({ label, provider, list }, i) => {
      const y = 160 + i * 150;
      const timed = provider === "pingdom";
      const maximum = timed
        ? Math.ceil(Math.max(...typical(list)) / 500) * 500
        : 100;
      return `${icon(provider, 32, y - 3)}${text(72, y + 19, label, 21, "#202426", 700)}
${text(32, y + 46, `${list.length} pages · ${timed ? `0–${maximum.toLocaleString("en-US")} ms scale · lower is better` : "0–100 score · higher is better"}`, 17, gray)}
${pairedBars(typical(list), y + 59, maximum, timed ? " ms" : "")}`;
    })
    .join("\n"),
  [
    "Google: median of each page's 3-run median.",
    "Other services: median of one result per page.",
  ],
  services
    .map(
      ({ label, list }) =>
        `${label}: Docs7 ${typical(list)[0]}, Mintlify ${typical(list)[1]}.`,
    )
    .join(" "),
);
for (const [device, list] of [
  ["mobile", mobile],
  ["desktop", desktop],
]) {
  const grouped = groupNames.map((label) => ({
    label,
    list: list.filter((r) => contentType(r)[1] === label),
  }));
  chart(
    `google-${device}.svg`,
    `Page types on ${device}`,
    "Google PageSpeed Insights · score out of 100",
    975,
    `${icon("google", 572, 26)}${grouped
      .map(({ label, list: group }, i) => {
        const y = 159 + i * 126;
        return `${text(32, y + 15, label, 22, "#202426", 700)}${text(608, y + 15, `${group.length} ${group.length === 1 ? "page" : "pages"}`, 18, gray, 400, "end")}
${pairedBars(typical(group), y + 30, 100)}`;
      })
      .join("\n")}`,
    [
      "Median of the per-page medians within each group.",
      `3 runs per URL · All ${pages.length} included pages · Higher is better`,
    ],
    grouped
      .map(
        ({ label, list: group }) =>
          `${label}, ${group.length} pages: Docs7 ${typical(group)[0]}, Mintlify ${typical(group)[1]}.`,
      )
      .join(" "),
  );
}
console.log(
  `Updated ${fileURLToPath(postFile)}, four charts, and third-party results.`,
);
