import { ImageResponse } from "@vercel/og";
import { baseUrl } from "./og-post-details";

export const size = {
  width: 1200,
  height: 630,
};

// advance widths of Inter Bold, in hundredths of an em, measured from the
// font file in public/fonts so lines can be broken before satori draws them
const WIDTH_KEYS =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00e7\u00e9\u00f6\u00fc\u011f\u0131\u015f\u2013\u2014\u2019\u2026";

const WIDTH_VALUES = [
  23, 35, 56, 65, 65, 95, 67, 34, 38, 38, 56, 68, 35, 47, 34, 39, 69, 43, 63,
  66, 68, 65, 66, 58, 66, 66, 34, 35, 68, 68, 68, 56, 103, 75, 66, 75, 73, 61,
  58, 76, 75, 28, 57, 69, 57, 92, 74, 78, 65, 78, 66, 65, 67, 73, 75, 103, 72,
  72, 67, 38, 39, 38, 49, 48, 46, 58, 63, 59, 63, 60, 39, 63, 63, 27, 27, 58,
  27, 91, 62, 61, 63, 63, 41, 56, 39, 62, 59, 85, 57, 59, 57, 47, 37, 47, 68,
  59, 60, 61, 62, 63, 27, 56, 50, 100, 35, 101,
];

const CHAR_WIDTH = new Map(
  WIDTH_KEYS.split("").map((char, index) => [char, WIDTH_VALUES[index] / 100]),
);

// the headline runs over the mark, which is faint enough to read through, so the
// column stays wide and long titles get fewer, fuller lines
const TITLE_SCALE = [
  { fontSize: 70, maxWidth: 780, maxLines: 3 },
  { fontSize: 64, maxWidth: 800, maxLines: 3 },
  { fontSize: 58, maxWidth: 800, maxLines: 4 },
  { fontSize: 52, maxWidth: 820, maxLines: 4 },
  { fontSize: 46, maxWidth: 840, maxLines: 5 },
  { fontSize: 40, maxWidth: 860, maxLines: 6 },
];

const LAST_STEP = TITLE_SCALE[TITLE_SCALE.length - 1];

const ELLIPSIS = "…";

// words too small to be left hanging at the end of a line
const WEAK_LINE_ENDINGS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "with",
  "your",
  "our",
  "using",
  "how",
  "why",
  "is",
  "are",
  "not",
  "no",
]);

// a line that ends where the sentence already pauses reads better than one that
// splits a phrase, so nudge the breaks toward punctuation and away from
// dangling little words
function breakBias(line: string, maxWidth: number) {
  const lastWord = line.slice(line.lastIndexOf(" ") + 1);
  let bias = 0;

  if (/[,:;]$/.test(lastWord)) {
    bias -= 0.018 * maxWidth ** 2;
  }
  if (WEAK_LINE_ENDINGS.has(lastWord.replace(/[,:;.]$/, "").toLowerCase())) {
    bias += 0.03 * maxWidth ** 2;
  }

  return bias;
}

function measure(text: string, fontSize: number) {
  let em = 0;
  for (const char of text.split("")) {
    em += CHAR_WIDTH.get(char) ?? 0.6;
  }
  return em * fontSize;
}

// fewest lines that fit, same result satori would reach on its own
function greedyLines(words: string[], fontSize: number, maxWidth: number) {
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || measure(candidate, fontSize) <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) {
    lines.push(current);
  }

  return lines;
}

// satori has no text-wrap: balance, so spread the words evenly ourselves by
// minimizing how much space each line leaves empty
function balanceLines(
  words: string[],
  fontSize: number,
  maxWidth: number,
  lineCount: number,
) {
  const cache = new Map<string, { cost: number; end: number }>();

  const best = (start: number, remaining: number) => {
    if (remaining === 0) {
      return {
        cost: start === words.length ? 0 : Number.POSITIVE_INFINITY,
        end: start,
      };
    }

    const key = `${start}:${remaining}`;
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }

    let result = { cost: Number.POSITIVE_INFINITY, end: start };

    for (let end = start + 1; end <= words.length; end++) {
      const line = words.slice(start, end).join(" ");
      const width = measure(line, fontSize);
      if (width > maxWidth && end > start + 1) {
        break;
      }

      const rest = best(end, remaining - 1);
      if (rest.cost === Number.POSITIVE_INFINITY) {
        continue;
      }

      const isLastLine = end === words.length;
      const cost =
        (maxWidth - width) ** 2 +
        (isLastLine ? 0 : breakBias(line, maxWidth)) +
        rest.cost;
      if (cost < result.cost) {
        result = { cost, end };
      }
    }

    cache.set(key, result);
    return result;
  };

  const lines: string[] = [];
  let start = 0;

  for (let remaining = lineCount; remaining > 0; remaining--) {
    const { cost, end } = best(start, remaining);
    if (cost === Number.POSITIVE_INFINITY) {
      return null;
    }
    lines.push(words.slice(start, end).join(" "));
    start = end;
  }

  return lines;
}

// nothing wider than the column may reach the renderer: a word with no space to
// break at (a URL, a long identifier) is cut off instead of running off the card
function truncate(text: string, fontSize: number, maxWidth: number) {
  let cut = text;

  while (cut && measure(`${cut}${ELLIPSIS}`, fontSize) > maxWidth) {
    const lastSpace = cut.lastIndexOf(" ");
    cut = lastSpace === -1 ? cut.slice(0, -1) : cut.slice(0, lastSpace);
  }

  return `${cut}${ELLIPSIS}`;
}

// a title long enough to run past the author row is cut at the last line the
// card can hold
function clampLines(
  lines: string[],
  fontSize: number,
  maxWidth: number,
  maxLines: number,
) {
  if (lines.length <= maxLines) {
    return lines;
  }

  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = truncate(kept[maxLines - 1], fontSize, maxWidth);

  return kept;
}

function layoutTitle(title: string) {
  const words = title.split(/\s+/).filter(Boolean);

  // a word with no space to break at has to be cut to the column it is drawn in,
  // so this is redone at every size rather than once up front
  const fitWords = (fontSize: number, maxWidth: number) =>
    words.map((word) =>
      measure(word, fontSize) > maxWidth
        ? truncate(word, fontSize, maxWidth)
        : word,
    );

  for (const step of TITLE_SCALE) {
    const stepWords = fitWords(step.fontSize, step.maxWidth);
    const lines = greedyLines(stepWords, step.fontSize, step.maxWidth);
    if (lines.length > step.maxLines) {
      continue;
    }

    return {
      fontSize: step.fontSize,
      lines:
        balanceLines(stepWords, step.fontSize, step.maxWidth, lines.length) ??
        lines,
    };
  }

  const stepWords = fitWords(LAST_STEP.fontSize, LAST_STEP.maxWidth);
  return {
    fontSize: LAST_STEP.fontSize,
    lines: clampLines(
      greedyLines(stepWords, LAST_STEP.fontSize, LAST_STEP.maxWidth),
      LAST_STEP.fontSize,
      LAST_STEP.maxWidth,
      LAST_STEP.maxLines,
    ),
  };
}

async function asset(path: string) {
  const response = await fetch(new URL(path, baseUrl));

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response;
}

async function svgDataUrl(path: string) {
  const svg = await (await asset(path)).text();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

type Post = {
  title: string;
  // unknown usernames are dropped from authorsData, so it can be empty even
  // when the post lists authors
  authorsData: { name: string; title?: string; image: string }[];
};

export async function renderPostCard(post: Post) {
  const [regular, bold, mark] = await Promise.all([
    (await asset("/fonts/Inter-Regular.ttf")).arrayBuffer(),
    (await asset("/fonts/Inter-Bold.ttf")).arrayBuffer(),
    svgDataUrl("/logo/upstash-icon-dark-bg.svg"),
  ]);

  const author = post.authorsData[0];
  const authorImage = author
    ? new URL(author.image, baseUrl).toString()
    : undefined;
  const title = layoutTitle(post.title);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "62px 70px",
          backgroundColor: "#0b0f0e",
          color: "#fff",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -320,
            right: -180,
            width: 900,
            height: 760,
            backgroundImage:
              "radial-gradient(circle, rgba(0, 233, 163, 0.2) 0%, rgba(0, 233, 163, 0) 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -430,
            left: -240,
            width: 860,
            height: 860,
            backgroundImage:
              "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 62%)",
          }}
        />
        <img
          alt=""
          src={mark}
          width={820}
          height={820}
          style={{ position: "absolute", top: -120, right: -210, opacity: 0.06 }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            fontSize: title.fontSize,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {title.lines.map((line, index) => (
            <div key={`${index}-${line}`} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 34,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {author && authorImage ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                alt={author.name}
                src={authorImage}
                width={70}
                height={70}
                style={{ borderRadius: 999, marginRight: 18 }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 27, fontWeight: 700 }}>
                  {author.name}
                </div>
                <div
                  style={{
                    marginTop: 3,
                    fontSize: 21,
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {author.title}
                </div>
              </div>
            </div>
          ) : null}
          <div
            style={{
              marginLeft: "auto",
              fontSize: 23,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            upstash.com/blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
