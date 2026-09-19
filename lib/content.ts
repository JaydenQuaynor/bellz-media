/**
 * All site copy lives here so it can be edited without touching components.
 *
 * Every number quoted below comes from lib/reels.ts, which is generated
 * directly from the Instagram scrape. Do not invent figures.
 */

// ─── PLACEHOLDERS — swap these before launch ────────────────────────────
export const CONTACT = {
  /** TODO: replace with the real domain once it is registered. */
  siteUrl: "https://bellzmedia.co",
  /** TODO: replace with Jeff's real scheduler link. */
  bookingUrl: "https://cal.com/bellz-media/15min",
  /** TODO: replace with Jeff's real address. */
  email: "jeff@bellzmedia.co",
  /** TODO: point at the real creator application (Tally / Typeform / form). */
  creatorApplyUrl: "https://tally.so/r/bellz-media-creators",
  creatorEmail: "creators@bellzmedia.co",
  instagram: "https://www.instagram.com/jeffbells7/",
  location: "Connecticut",
};

// ─── The problem ────────────────────────────────────────────────────────
export const PROBLEM = {
  eyebrow: "The problem",
  heading: "You're posting. It isn't reaching anyone.",
  body: [
    "Most local businesses already make content. A staff member films something on a slow Tuesday, it goes up, and four hundred people see it — most of whom already follow you and already buy from you.",
    "That isn't a content problem. It's a reach problem, and the two get treated as the same thing.",
  ],
  points: [
    {
      k: "Posting more doesn't fix it",
      v: "Volume on a format that doesn't travel just produces more videos nobody sees.",
    },
    {
      k: "Your follower count is a ceiling",
      v: "If distribution depends on who already follows you, your best day is capped at your worst assumption.",
    },
    {
      k: "Boosting rents attention",
      v: "The reach stops the day the card stops. Nothing compounds.",
    },
  ],
};

// ─── The mechanism — the actual argument ────────────────────────────────
export const MECHANISM = {
  eyebrow: "What we actually sell",
  heading: "Followers aren't reach.",
  lede: "Bellz Media has 644 followers and 6,794,221 views. Every one of those views was earned by the video, not handed to it by an audience.",
  body: [
    "Short-form platforms decide who sees a video based on how the video performs in its first few seconds — not on who follows the account. That is the entire mechanism, and it is why a barbershop with 300 followers can out-reach a brand with 80,000.",
    "It also means the skill is transferable. A hook that holds attention holds it whether the subject is a college dorm or your storefront. We've spent eight months proving that on our own account, in public, where the numbers can be checked.",
  ],
  callout: {
    stat: "10,550×",
    label: "views per follower",
    note: "6,794,221 views ÷ 644 followers. The ratio is the point.",
  },
};

// ─── Services ───────────────────────────────────────────────────────────
export const SERVICES = {
  eyebrow: "What we make",
  heading: "Three things, done properly.",
  items: [
    {
      n: "UGC creation",
      accent: "teal" as const,
      body: "Native-feeling videos that look like a customer made them, not a brand. Shot, scripted and edited by us. You get the raw files and full usage rights for ads, your own feed, and your site.",
      deliverables: [
        "Hook-first scripting",
        "Filming and edit",
        "Raw files + usage rights",
        "Vertical 9:16, captioned",
      ],
    },
    {
      n: "Organic short-form",
      accent: "magenta" as const,
      body: "Content built to be distributed by the algorithm rather than your follower list. This is the work the 6.79M came from — the format, pacing and hook structure that makes a video travel past the people who already know you.",
      deliverables: [
        "Reels, TikToks, Shorts",
        "Posting cadence + timing",
        "Hook testing across variants",
        "Performance read every month",
      ],
    },
    {
      n: "Content systems",
      accent: "indigo" as const,
      body: "For businesses that want to keep producing after the engagement ends. We build the repeatable part — the formats that work for your business, and how to shoot them without us.",
      deliverables: [
        "Format playbook for your business",
        "Shot lists your staff can run",
        "Editing templates",
        "Team walkthrough",
      ],
    },
  ],
};

// ─── Process ────────────────────────────────────────────────────────────
export const PROCESS = {
  eyebrow: "How it works",
  heading: "Four steps, no mystery.",
  note: "Numbered because it is genuinely sequential — each step needs the one before it.",
  steps: [
    {
      t: "Strategy call",
      d: "Fifteen minutes. What you sell, who buys it, what you've already tried. You'll leave knowing whether this is a fit, and we'll tell you if it isn't.",
      time: "Day 0",
    },
    {
      t: "Format sprint",
      d: "We pick three or four formats suited to your business and write the hooks. You approve the direction before anything gets filmed.",
      time: "Week 1",
    },
    {
      t: "Shoot and ship",
      d: "We film in a single session — usually on site, usually under two hours — then edit and deliver. First videos go live inside two weeks.",
      time: "Week 2",
    },
    {
      t: "Read and iterate",
      d: "We look at what travelled and what didn't, then make more of what worked. This is the part most people skip, and it's where the compounding happens.",
      time: "Ongoing",
    },
  ],
};

// ─── Comparison ─────────────────────────────────────────────────────────
export const COMPARISON = {
  eyebrow: "The alternatives",
  heading: "What else you could do with the money.",
  columns: ["Bellz Media", "In-house", "Traditional agency", "Boosting posts"],
  rows: [
    { label: "Built for organic reach", v: [true, false, false, false] },
    { label: "Works without a follower base", v: [true, false, false, false] },
    { label: "Reach continues after you stop paying", v: [true, true, false, false] },
    { label: "Short-form native", v: [true, "Varies", false, true] },
    { label: "Someone else does the work", v: [true, false, true, true] },
    { label: "On site in Connecticut", v: [true, true, "Rarely", "N/A"] },
    { label: "Proven at 400K+ views", v: [true, "Rarely", "Rarely", false] },
  ],
  footnote:
    "Nothing here says the alternatives are worthless. Ads work — they just rent attention instead of building it, and they still need creative that holds a viewer.",
};

// ─── Packages ───────────────────────────────────────────────────────────
export const PACKAGES = {
  eyebrow: "Engagements",
  heading: "Pick the shape that fits.",
  note: "Priced per business after the call — scope, filming days and location all move the number, and quoting a figure here would only be wrong for most of the people reading it.",
  tiers: [
    {
      name: "Starter",
      accent: "tangerine" as const,
      forWho: "One location testing whether this works.",
      items: [
        "4 videos per month",
        "One filming session",
        "Hook-first scripting",
        "Captions and edit",
        "Full usage rights",
      ],
      featured: false,
    },
    {
      name: "Growth",
      accent: "teal" as const,
      forWho: "Businesses that want consistent output and a feedback loop.",
      items: [
        "8–10 videos per month",
        "Two filming sessions",
        "Hook testing across variants",
        "Posting cadence managed",
        "Monthly performance read",
        "Full usage rights",
      ],
      featured: true,
    },
    {
      name: "Full retainer",
      accent: "indigo" as const,
      forWho: "Multi-location, or a launch that needs volume.",
      items: [
        "16+ videos per month",
        "Weekly filming",
        "Paid-ad creative variants",
        "Format playbook for your team",
        "Direct line, same-day replies",
        "Full usage rights",
      ],
      featured: false,
    },
  ],
};

// ─── Objections — the real ones ─────────────────────────────────────────
export const OBJECTIONS = {
  eyebrow: "Fair questions",
  heading: "The things you're actually thinking.",
  lede: "Written to be useful rather than reassuring. If an answer here rules us out for you, that's the answer doing its job.",
  items: [
    {
      q: "You're new. Where's your client list?",
      a: "There isn't one yet, and pretending otherwise would fall apart the first time you asked to speak to someone. What exists instead is a public track record: 52 reels, 6,794,221 views, five past 400,000, two past a million — all on an account with 644 followers, all verifiable by opening Instagram right now. We're taking on our first local clients at a founding rate because the roster is the one thing we can't show you yet.",
    },
    {
      q: "My business isn't interesting enough to go viral.",
      a: "The video that did 3,470,005 views was fifteen seconds about nothing in particular. Reach on short-form comes from structure — how fast the hook lands, whether the first two seconds give someone a reason to stay — not from the subject being inherently fascinating. Plumbing, dentistry and dry cleaning all work. The format does the lifting.",
    },
    {
      q: "What if the videos don't perform?",
      a: "Some won't. Of our 52 reels, five broke out and the median sits at 5,158 views — that is genuinely how short-form distributes, for everyone, and anyone promising you a hit every time is selling something. The model is volume and iteration: make enough well-structured attempts that the breakouts become a matter of when. We'd rather you hear that now than after the invoice.",
    },
    {
      q: "Why not just run ads?",
      a: "Run ads. They work. But paid reach stops the day the card stops, and you still need creative that holds a viewer for three seconds — which is the same problem organic solves. Most businesses get the best result running both, using the organic winners as ad creative because they've already been tested on a cold audience for free.",
    },
    {
      q: "Can't I just do this myself?",
      a: "Genuinely, yes — and if you have someone on staff with time and an instinct for it, that's cheaper than hiring us. The thing you'd be buying is the eight months already spent learning which hooks hold and which formats die, on someone else's account instead of yours. If you'd rather build it in-house, the Content Systems engagement exists to hand that over deliberately.",
    },
    {
      q: "Do I have to be on camera?",
      a: "No. Plenty of the strongest formats are hands-only, product-only, or voiceover over b-roll. If you do want to be on camera and you're not comfortable yet, that's normal and it's a thing we coach through on the shoot — most people are fine by the second take.",
    },
    {
      q: "How long before I see anything?",
      a: "First videos are live within two weeks of the strategy call. Meaningful reach data takes about a month, because you need enough attempts to separate a good format from a lucky one. Anyone quoting you a number of views by a specific date is guessing.",
    },
    {
      q: "Do you only work with Connecticut businesses?",
      a: "That's the focus — 12 of our reels are tagged to UConn and Hartford and carry 1,710,534 views between them, so the local audience is already there. On-site filming is Connecticut and the immediate surrounds. Remote work for brands outside the state is possible when the format doesn't need us in the room.",
    },
    {
      q: "Who actually makes the content?",
      a: "Jeffery Antwi leads every engagement — he writes the hooks and he is on the shoot. Bellz Media is a collective, so depending on the format and the volume you need, other creators from the network come in on filming and edit. What does not happen is your account getting handed to a junior you never meet, or an offshore edit farm working from a brief they never read.",
    },
    {
      q: "What does it cost?",
      a: "It depends on filming days, volume and location, so a number on a webpage would be wrong for most people reading it. What we'll say plainly: it's priced for an independent local business rather than a national brand, there's no long lock-in, and you'll have a real figure by the end of the fifteen-minute call.",
    },
  ],
};

// ─── Founding offer ─────────────────────────────────────────────────────
export const FOUNDING = {
  eyebrow: "Right now",
  heading: "Three founding clients.",
  body: "We're new and the roster is empty — so the first three Connecticut businesses get a founding rate, held for twelve months, in exchange for letting us use the results as case studies. That's the trade: you take a chance on a new studio, you don't pay new-studio prices later.",
  points: [
    "Founding rate locked for 12 months",
    "Month to month — leave whenever",
    "Results become a public case study",
  ],
};

// ─── For creators — the second audience ─────────────────────────────────
// Deliberately placed after the brand CTA so it never competes with the
// primary conversion. Nothing here claims network-wide numbers, because only
// Jeff's account has been measured.
export const CREATORS = {
  eyebrow: "For creators",
  heading: "Work the briefs, skip the outreach.",
  lede: "Bellz Media is a collective. Brands come to us, we match the brief to whoever fits it, and you get paid to make what you would be making anyway.",
  gets: [
    {
      k: "Briefs come to you",
      v: "We do the pitching and the negotiating. You get a scope, a rate and a deadline — not a cold DM thread that dies after you send a rate card.",
    },
    {
      k: "Your page stays yours",
      v: "Nothing here asks for your handle, your login, or a cut of work you found yourself. You are not signing your audience over to anybody.",
    },
    {
      k: "You see the numbers",
      v: "Every video you make for us comes back with its actual reach and engagement, so you learn what travelled instead of guessing.",
    },
    {
      k: "Paid on delivery",
      v: "Not net-60, not on the brand's schedule, not after three follow-up emails.",
    },
  ],
  barTitle: "What we look for",
  bar: [
    "You make short-form, and some of it travels",
    "Connecticut-based or able to shoot here — some briefs are remote",
    "Follower count is not the bar",
  ],
  kicker:
    "That last one is the whole thesis of this page. This studio was built on an account with 644 followers, so we are not going to turn you away over yours.",
  cta: "Apply to the collective",
};

// ─── Final CTA ──────────────────────────────────────────────────────────
export const FINAL = {
  heading: "Fifteen minutes. No deck.",
  body: "Tell us what you sell and what you've already tried. We'll tell you whether short-form is the right lever for your business — including when it isn't.",
  cta: "Book a 15-min strategy call",
};
