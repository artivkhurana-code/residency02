"use client";

import { motion, type Variants } from "motion/react";

// Each note drops onto the board and settles at its own angle.
const note: Variants = {
  hidden: { opacity: 0, y: -40, scale: 1.08, rotate: 0 },
  shown: ({ delay, tilt }: { delay: number; tilt: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: tilt,
    transition: { type: "spring", stiffness: 170, damping: 16, delay },
  }),
};

export default function Notes() {
  return (
    <section className="notes" aria-labelledby="hero-title">
      <div className="notes-cluster">
      <motion.div
        className="note note-paper note-small"
        variants={note}
        initial="hidden"
        animate="shown"
        custom={{ delay: 0.15, tilt: -5 }}
        whileHover={{ y: -4, rotate: -3 }}
      >
        <motion.div
          className="patch"
          initial={{ opacity: 0, y: -24, scale: 1.1, rotate: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: -4 }}
          transition={{ type: "spring", stiffness: 170, damping: 15, delay: 0.35 }}
        >
          <span className="patch-pin" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stickers/residency-patch.svg" alt="Forma Residency" width={966} height={193} />
        </motion.div>
        <p className="note-season">
          Season 2 <em>Cohort</em>
        </p>
      </motion.div>

      <motion.div
        className="note note-signal note-main"
        variants={note}
        initial="hidden"
        animate="shown"
        custom={{ delay: 0.3, tilt: 1.5 }}
        whileHover={{ y: -4, rotate: 0.5 }}
      >
        <span className="note-pin" aria-hidden="true" />
        <h1 className="note-title" id="hero-title">
          Meet the <em>audacious</em>
        </h1>
      </motion.div>

      <motion.div
        className="note note-paper-2 note-copy"
        variants={note}
        initial="hidden"
        animate="shown"
        custom={{ delay: 0.45, tilt: 4 }}
        whileHover={{ y: -4, rotate: 2.5 }}
      >
        <span className="note-tape" aria-hidden="true" />
        <p>
          You&rsquo;re about to spend six weeks building alongside these people. Meet the other founders, see what
          they&rsquo;re working on, and get to know who&rsquo;s in the room.
        </p>
      </motion.div>
      </div>
    </section>
  );
}
