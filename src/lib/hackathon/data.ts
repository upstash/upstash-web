/**
 * Static data for the 2026 Summer Hackathon voting app.
 *
 * The project list and team members come straight from the internal
 * "2026 summer hackhaton" brief. Voters are all team members plus Can and Adem
 * (who don't have a project but can still vote).
 *
 * Names are normalized to stable `id` slugs; these ids are what we persist in
 * Redis so display names can change without breaking existing ballots.
 */

/** Max number of distinct projects a single person may vote for. */
export const MAX_VOTES = 5;

export interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  /** Voter ids of the people who built this project (can't vote for it). */
  members: string[];
}

export interface Voter {
  id: string;
  name: string;
}

export const PROJECTS: Project[] = [
  {
    id: "upstash-tui",
    name: "upstash tui",
    emoji: "🖥️",
    description: "Terminal UI for devs who live in their terminal",
    members: ["abdullah"],
  },
  {
    id: "bin-stash",
    name: "bin-stash",
    emoji: "📦",
    description: "Replicated blob storage",
    members: ["mehmet-d"],
  },
  {
    id: "upstash-elastic",
    name: "Upstash Elastic",
    emoji: "🔎",
    description: "Elasticsearch API built on top of Upstash Redis Search",
    members: ["mehmet-t"],
  },
  {
    id: "observe-mode",
    name: "observe-mode",
    emoji: "📡",
    description: "Agent first Upstash Telemetry",
    members: ["fahreddin"],
  },
  {
    id: "context-hub",
    name: "Context Hub",
    emoji: "🧠",
    description: "Fast context about anything",
    members: ["enes"],
  },
  {
    id: "blogx-enhanced",
    name: "blogx - enhanced",
    emoji: "✍️",
    description: "Pipeline blogpost generation",
    members: ["burak"],
  },
  {
    id: "upstash-tag",
    name: "Upstash Tag",
    emoji: "🏷️",
    description: "Self serve Claude Tag powered by Upstash",
    members: ["arda"],
  },
  {
    id: "upstash-architect",
    name: "Upstash Architect",
    emoji: "🏛️",
    description:
      "An advisor tool that turns a plain-text project description into an Upstash product plan, with per-product plan options, all plan limits, and a cost estimate. Built for both human and agentic use.",
    members: ["ilter"],
  },
  {
    id: "box-deploy-button",
    name: "Box Deploy Button",
    emoji: "🚀",
    description: "Like vercel deploy button, but for upstash box",
    members: ["ali-tarik"],
  },
  {
    id: "context7-debugger",
    name: "Context7-debugger",
    emoji: "🐞",
    description: "Trace the steps of the LLM to see the failure cases",
    members: ["elif"],
  },
  {
    id: "box-gui-api",
    name: "Box GUI API",
    emoji: "🎛️",
    description: "Visual interface for the Upstash Box API",
    members: ["bilal"],
  },
  {
    id: "agent",
    name: "Agent",
    emoji: "🤖",
    description: "Visual interface for Upstash Box",
    members: ["yusuf"],
  },
  {
    id: "upstash-office",
    name: "upstash office",
    emoji: "🏢",
    description: "A real upstash office with employees",
    members: ["josh"],
  },
  {
    id: "billion-dollar-company",
    name: "Who Wants to be a Billion-Dollar Company?",
    emoji: "💸",
    description:
      "A customer decision game about pricing, trust, support, and not burning the kitchen.",
    members: ["sertug"],
  },
  {
    id: "handmade-kafka",
    name: "Handmade Kafka",
    emoji: "📨",
    description: "Bringing back the kafka stronger, on top of the redis",
    members: ["sancar", "metin"],
  },
  {
    id: "agenttalk",
    name: "AgentTalk",
    emoji: "💬",
    description: "Support for agents…",
    members: ["ozan"],
  },
];

/**
 * Everyone eligible to vote. Team members are derived from the projects above,
 * plus Can and Adem who have no project of their own.
 */
export const VOTERS: Voter[] = [
  { id: "abdullah", name: "Abdullah" },
  { id: "mehmet-d", name: "Mehmet D" },
  { id: "mehmet-t", name: "Mehmet T" },
  { id: "fahreddin", name: "Fahreddin" },
  { id: "enes", name: "Enes" },
  { id: "burak", name: "Burak" },
  { id: "arda", name: "Arda" },
  { id: "ilter", name: "ilter" },
  { id: "ali-tarik", name: "Ali Tarik" },
  { id: "elif", name: "Elif" },
  { id: "bilal", name: "Bilal" },
  { id: "yusuf", name: "Yusuf" },
  { id: "josh", name: "Josh" },
  { id: "sertug", name: "Sertug" },
  { id: "sancar", name: "Sancar" },
  { id: "metin", name: "Metin" },
  { id: "ozan", name: "Ozan" },
  { id: "can", name: "Can" },
  { id: "adem", name: "Adem" },
];

const PROJECT_BY_ID = new Map(PROJECTS.map((p) => [p.id, p]));
const VOTER_BY_ID = new Map(VOTERS.map((v) => [v.id, v]));

export function getProject(id: string): Project | undefined {
  return PROJECT_BY_ID.get(id);
}

export function isValidVoter(id: string): boolean {
  return VOTER_BY_ID.has(id);
}

export function isValidProject(id: string): boolean {
  return PROJECT_BY_ID.has(id);
}

/** The project id this voter built (and therefore cannot vote for), if any. */
export function ownProjectId(voterId: string): string | null {
  const p = PROJECTS.find((proj) => proj.members.includes(voterId));
  return p ? p.id : null;
}
