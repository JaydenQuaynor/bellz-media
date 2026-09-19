import { ACCOUNT, REELS, type Reel } from "./reels";

export type Stat = {
  value: string;
  label: string;
  accent: "coral" | "plum" | "sky" | "navy";
};

const byViews = (a: Reel, b: Reel) => b.views - a.views;
const likeRate = (r: Reel) => r.likes / r.views;

/**
 * Rank, don't filter. Every query returns the whole catalogue in a different
 * order, so the wall always fills and the re-sort IS the answer to the query —
 * ask for Connecticut and the Connecticut work moves into the big slots.
 */
const RANKERS = {
  reach: (r: Reel[]) => [...r].sort(byViews),

  product: (r: Reel[]) => [
    ...r.filter((x) => x.kind === "product"),
    ...r.filter((x) => x.kind !== "product").sort(byViews),
  ],

  local: (r: Reel[]) => [
    ...r.filter((x) => x.local).sort(byViews),
    ...r.filter((x) => !x.local).sort(byViews),
  ],

  engagement: (r: Reel[]) => [...r].sort((a, b) => likeRate(b) - likeRate(a)),
} satisfies Record<string, (r: Reel[]) => Reel[]>;

type BriefSeed = {
  id: keyof typeof RANKERS;
  /** Typed into the brief bar, character by character. */
  query: string;
  /** Short label for the clickable chip. */
  chip: string;
  /** How these results are ordered — shown next to the count. */
  sortLabel: string;
  /** Pops in beside the work as a stack. */
  stats: Stat[];
};

const SEEDS: BriefSeed[] = [
  {
    id: "reach",
    query: "short-form that actually travels",
    chip: "Reach",
    sortLabel: "most viewed first",
    stats: [
      { value: ACCOUNT.totalViewsLabel, label: "views, 52 reels", accent: "coral" },
      { value: String(ACCOUNT.over400k), label: "past 400K each", accent: "plum" },
      { value: ACCOUNT.totalLikesLabel, label: "likes", accent: "navy" },
    ],
  },
  {
    id: "product",
    query: "a product launch people finish watching",
    chip: "Product launch",
    sortLabel: "product work first",
    stats: [
      { value: "416,947", label: "views · QuickMovee", accent: "plum" },
      { value: "20,778", label: "likes on one explainer", accent: "coral" },
      { value: "19s", label: "runtime", accent: "sky" },
    ],
  },
  {
    id: "local",
    query: "reach an audience in connecticut",
    chip: "Connecticut",
    sortLabel: "Connecticut first",
    stats: [
      { value: ACCOUNT.localViewsLabel, label: "views in Connecticut", accent: "navy" },
      { value: String(ACCOUNT.localReels), label: "reels made in Connecticut", accent: "sky" },
      { value: "8 mo", label: "standing start", accent: "coral" },
    ],
  },
  {
    id: "engagement",
    query: "content people actually react to",
    chip: "Engagement",
    sortLabel: "highest like rate first",
    stats: [
      { value: "7.9%", label: "best like rate", accent: "sky" },
      { value: ACCOUNT.totalLikesLabel, label: "likes total", accent: "coral" },
      { value: "2,064", label: "comments", accent: "plum" },
    ],
  },
];

export type Brief = BriefSeed & {
  /** The whole catalogue ordered for this query. Index 0 is the top result. */
  results: Reel[];
  count: number;
};

export const BRIEFS: Brief[] = SEEDS.map((s) => {
  const results = RANKERS[s.id](REELS);
  return { ...s, results, count: results.length };
});

/** Highest-viewed reel overall — used for the avatar on the CTA buttons. */
export const TOP_REEL_ID = [...REELS].sort(byViews)[0].id;
