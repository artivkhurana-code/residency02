/* ============================================================
   FORMA — The Residency, Season 02
   Sources: "Forma Residency S2 — Candidate Board" (Offer section,
   blurbs + links only) and "Forma Residency S2 — X Handles"
   (verified accounts only). Nothing from the internal notes,
   traction or risk lines is used here.
   One-liners are provisional copy; check spellings with each
   founder before this goes public.
   ============================================================ */

export type Field =
  | "AI"
  | "Hardware"
  | "Fintech"
  | "Education"
  | "Health"
  | "Energy"
  | "Consumer"
  | "Architecture";

export type Resident = {
  founder: string;
  company: string;
  oneLiner: string;
  about: string;
  field: Field;
  /** Company website, bare domain (no protocol). */
  site?: string;
  /** Founder's personal X handle, without the @. */
  x?: string;
  /** Company X handle, without the @. */
  companyX?: string;
};

export const SEASON = {
  name: "The Residency",
  season: "Season 02",
  city: "Bristol",
  year: 2026,
  weeks: 6,
};

export const RESIDENTS: Resident[] = [
  {
    founder: "Prajit Sengupta",
    company: "Sapiaverse",
    oneLiner: "A living digital twin of millions of simulated people.",
    about:
      "A Population Action Model: millions of agents who act, react and influence one another, so population-scale outcomes emerge from the bottom up instead of from next-word prediction.",
    field: "AI",
    site: "sapiaverse.com",
    x: "prajit28",
  },
  {
    founder: "Matt Stewart",
    company: "Novi",
    oneLiner: "Phone focus for schools and families, with bypass detection.",
    about:
      "Schools get a hardware-free focus mode that flags bypass attempts automatically. Families get a physical NFC version, where the tap itself builds the habit.",
    field: "Education",
    site: "getnovi.co.uk",
  },
  {
    founder: "Yuxin Zhu",
    company: "Wattness",
    oneLiner: "Smarter bidding and dispatch for grid-scale batteries.",
    about:
      "Optimisation software for grid-connected battery operators: better bidding and dispatch that lifts revenue while respecting the battery's health.",
    field: "Energy",
    site: "wattness.ai",
    companyX: "wattness_ai",
  },
  {
    founder: "Taha Suleman",
    company: "Flow",
    oneLiner: "The operating system for architecture studios.",
    about:
      "An architect turned coder building software for architecture, engineering and construction. It starts with Flow: fee tracking against RIBA stages, timesheets and a client portal.",
    field: "Architecture",
  },
  {
    founder: "Shreevardhan Shah",
    company: "SuperSchool",
    oneLiner: "The context layer that lets schools put AI to work.",
    about:
      "Captures lessons, classwork, worksheets and whiteboard sessions into a context layer that teachers, edtech tools and AI platforms can build on. A Whoop for the classroom.",
    field: "Education",
    site: "superschool.us",
  },
  {
    founder: "Sri Kodali",
    company: "Sovereign Intelligence",
    oneLiner: "Private AI research that never leaves your network.",
    about:
      "Runs inside a client's own network so sensitive questions stay there. Every claim is cited to a scored source, and it declines to judge when the evidence can't carry a conclusion.",
    field: "AI",
  },
  {
    founder: "Vaishnavi Mal",
    company: "AskMaya AI",
    oneLiner: "A voice-first phone assistant for older people.",
    about:
      "A multilingual, screen-aware Android assistant that talks older users through their apps and helps them get things done on their phones.",
    field: "Consumer",
    x: "wisenaviii",
  },
  {
    founder: "Tair Asim",
    company: "trce",
    oneLiner: "See exactly which agent skills wrote your code.",
    about:
      "A verification layer for AI-written software. Shows engineering teams which agent skills and instructions ran, which versions were used, and what to share, fix or remove.",
    field: "AI",
    site: "trce.run",
    x: "tair",
  },
  {
    founder: "Mohannad Najjar",
    company: "SIDRA",
    oneLiner: "Autonomous drones that find wildfires, day or night.",
    about:
      "Wildfire-detection drones combining computer vision with LiDAR night flight, and automated takeoff, landing, patrol and charging.",
    field: "Hardware",
    site: "sidraaero.com",
  },
  {
    founder: "Natalia Stefanowski",
    company: "AI Diagnostics",
    oneLiner: "Diagnosis that weighs Western and traditional medicine together.",
    about:
      "Cross-references Western medical data with traditional and alternative medicine to give patients a hypothesised diagnosis, a match score and treatment pathways. Starting with eczema.",
    field: "Health",
    x: "natalia2themoon",
  },
  {
    founder: "Justin Kim",
    company: "HeyPCB",
    oneLiner: "Describe a circuit board in words, get the PCB and enclosure.",
    about:
      "AI-native electronics and mechanical design: plain-language prompts become schematics, PCBs and CAD enclosures. The long-term ambition is to own manufacturing too.",
    field: "Hardware",
    site: "heypcb.ai",
    x: "justinplaygame",
    companyX: "heypcbai",
  },
  {
    founder: "Kehinde Mccomb",
    company: "Pitch’em",
    oneLiner: "Creators pitch brands directly and track every deal.",
    about:
      "A mobile outbound and relationship tool for creators: find the brand decision-makers, pitch them directly, and keep track of the outreach and the deals.",
    field: "Consumer",
    x: "kmccomb21",
  },
  {
    founder: "Kenton Cooley",
    company: "SP3ND",
    oneLiner: "Buy almost anything online with stablecoins, agents included.",
    about:
      "Works out shipping, tax and import costs, verifies payment on-chain, then places the fiat order as merchant of record. Web, Solana mobile, browser extension, MCP and agent APIs.",
    field: "Fintech",
    site: "sp3nd.shop",
    x: "kenton_cooley",
    companyX: "SP3NDdotshop",
  },
  {
    founder: "Saurav Tiwari",
    company: "Aircraft Concept Studio",
    oneLiner: "One design environment for small aircraft makers.",
    about:
      "Takes mission requirements through geometry, aerodynamics, structures, propulsion and control in one place, for UAV makers who can't run the big aerospace toolchains.",
    field: "Hardware",
  },
  {
    founder: "Nisan Kotik",
    company: "Autonomous Soaring",
    oneLiner: "Control software that lets drones soar like birds.",
    about:
      "Bio-inspired control that helps fixed-wing drones sense and ride atmospheric energy, cutting battery swaps and extending missions. The long-term vision is a morphing-wing aircraft.",
    field: "Hardware",
  },
  {
    founder: "Djason Gadiou",
    company: "Finagotchi",
    oneLiner: "A virtual pet that thrives when you save.",
    about:
      "A gamified savings companion: good money habits keep a virtual pet alive and evolving, with quests, XP and a leaderboard across an app and planned hardware.",
    field: "Fintech",
    site: "finagotchi.app",
    x: "Magicred_1",
    companyX: "finagotchi",
  },
];

export const FIELDS: Field[] = [
  "AI",
  "Hardware",
  "Fintech",
  "Education",
  "Consumer",
  "Health",
  "Energy",
  "Architecture",
];

/** Block colours, rotated across the wall so neighbours never match. */
export const TONES = ["butter", "blush", "lilac", "sage", "sky", "peach", "cream"] as const;
export type Tone = (typeof TONES)[number];

export const toneFor = (i: number): Tone => TONES[i % TONES.length];

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
