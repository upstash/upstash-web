import GithubSlugger from "github-slugger";

export type TocItem = {
  level: number;
  text: string;
  id: string;
};

export function getTocItems(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const noCode = content.replace(/```[\s\S]*?```/g, "");
  const re = /^(#{2,4})\s+(.+?)\s*$/gm;
  const items: TocItem[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(noCode))) {
    const level = m[1].length;
    const text = m[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_]+/g, "")
      .trim();
    items.push({ level, text, id: slugger.slug(text) });
  }
  return items;
}
