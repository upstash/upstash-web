import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Remark plugin that probes each markdown image at build time and injects
 * `width`/`height` onto the resulting <img>, so the MDX renderer can hand them
 * to next/image (which requires intrinsic dimensions for remote/string srcs).
 *
 * - Local paths (`/blog/...`) are read from `public/`.
 * - Remote URLs (e.g. cdn.contentport.io) are fetched once and cached.
 * - Animated/vector formats (.gif, .svg) are skipped so they stay plain <img>
 *   and don't get frozen/mangled by the image optimizer.
 */

interface MdastNode {
  type: string;
  url?: string;
  data?: { hProperties?: Record<string, unknown> };
  children?: MdastNode[];
}

interface Dimensions {
  width: number;
  height: number;
}

const cache = new Map<string, Dimensions | null>();

const SKIP = /\.(gif|svg)(\?|#|$)/i;

async function getDimensions(src: string): Promise<Dimensions | null> {
  if (cache.has(src)) return cache.get(src) ?? null;

  let result: Dimensions | null = null;
  try {
    let buffer: Buffer;
    if (/^https?:\/\//.test(src)) {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`fetch ${src} -> ${res.status}`);
      buffer = Buffer.from(await res.arrayBuffer());
    } else if (src.startsWith("/")) {
      buffer = await readFile(path.join(process.cwd(), "public", src));
    } else {
      return null;
    }

    const { width, height } = await sharp(buffer).metadata();
    if (width && height) result = { width, height };
  } catch (error) {
    console.warn(`[remark-image-dimensions] could not size ${src}:`, error);
  }

  cache.set(src, result);
  return result;
}

export function remarkImageDimensions() {
  return async (tree: MdastNode) => {
    const images: MdastNode[] = [];
    const walk = (node: MdastNode) => {
      if (node.type === "image" && node.url && !SKIP.test(node.url)) {
        images.push(node);
      }
      node.children?.forEach(walk);
    };
    walk(tree);

    await Promise.all(
      images.map(async (node) => {
        const dims = await getDimensions(node.url!);
        if (!dims) return;
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          width: dims.width,
          height: dims.height,
        };
      }),
    );
  };
}
