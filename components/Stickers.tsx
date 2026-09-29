"use client";

import { motion } from "motion/react";

/** Small keepsakes scattered around the board. Decorative only. */

function Badge() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <defs>
        <path id="badge-ring" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#f2efe6" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#0b0b0c" strokeWidth="0.8" strokeDasharray="2 3" />
      <text fontFamily="var(--font-data), monospace" fontSize="9.6" letterSpacing="2.6" fill="#0b0b0c">
        <textPath href="#badge-ring">THE RESIDENCY · BRISTOL · 2026 ·</textPath>
      </text>
      <text x="60" y="70" textAnchor="middle" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="30" fill="#0b0b0c">
        02
      </text>
    </svg>
  );
}

// The Forma pillar mark, from forma-logo-full-white.svg.
const PILLAR =
  "M225.456 16.2332V0H0V16.2331C17.4964 16.2331 31.68 30.4168 31.68 47.9132V148.685C31.68 166.182 17.4964 180.365 0 180.365V196.598H225.456V180.365C207.96 180.365 193.777 166.181 193.777 148.685V47.9132C193.777 30.4172 207.96 16.2338 225.456 16.2332ZM64.2359 16.2332C55.4877 16.2332 48.3958 23.325 48.3958 32.0732V164.525C48.3958 173.274 55.4877 180.365 64.2359 180.365C72.9841 180.365 80.0759 173.274 80.0759 164.525V32.0732C80.0759 23.325 72.9841 16.2332 64.2359 16.2332ZM96.7839 32.0732C96.7839 23.325 103.876 16.2332 112.624 16.2332C121.372 16.2332 128.464 23.325 128.464 32.0732V164.525C128.464 173.274 121.372 180.365 112.624 180.365C103.876 180.365 96.7839 173.274 96.7839 164.525V32.0732ZM161.035 16.2338C152.287 16.2338 145.195 23.3256 145.195 32.0738V164.526C145.195 173.274 152.287 180.366 161.035 180.366C169.784 180.366 176.875 173.274 176.875 164.526V32.0738C176.875 23.3256 169.784 16.2338 161.035 16.2338Z";

function Stamp() {
  return (
    <span className="stamp-inner">
      <span className="stamp-top">Forma post</span>
      <svg className="stamp-mark" viewBox="0 0 226 197" width="30" height="26">
        <path fillRule="evenodd" clipRule="evenodd" d={PILLAR} fill="currentColor" />
      </svg>
      <span className="stamp-bot">Bristol</span>
    </span>
  );
}

type Item = {
  key: string;
  className: string;
  rotate: number;
  node: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    key: "hand-a",
    className: "st st-hand-a",
    rotate: -14,
    // eslint-disable-next-line @next/next/no-img-element
    node: <img src="/stickers/hand.png" alt="" />,
  },
  { key: "badge", className: "st st-badge", rotate: -8, node: <Badge /> },
  {
    key: "pegasus",
    className: "st st-pegasus",
    rotate: 10,
    // eslint-disable-next-line @next/next/no-img-element
    node: <img src="/stickers/pegasus.svg" alt="" />,
  },
  { key: "stamp", className: "st st-stamp", rotate: 6, node: <Stamp /> },
  {
    key: "computer",
    className: "st st-computer",
    rotate: -9,
    // eslint-disable-next-line @next/next/no-img-element
    node: <img src="/stickers/computer.png" alt="" />,
  },
  {
    key: "hand-b",
    className: "st st-hand-b",
    rotate: 12,
    // eslint-disable-next-line @next/next/no-img-element
    node: <img src="/stickers/hand.png" alt="" style={{ transform: "scaleX(-1)" }} />,
  },
];

export default function Stickers() {
  return (
    <div className="stickers" aria-hidden="true">
      {ITEMS.map((it, i) => (
        <motion.span
          key={it.key}
          className={it.className}
          initial={{ opacity: 0, scale: 0.4, rotate: it.rotate - 20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: it.rotate }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 + (i % 3) * 0.12 }}
        >
          {it.node}
        </motion.span>
      ))}
    </div>
  );
}
