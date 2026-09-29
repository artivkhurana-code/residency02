"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, type Variants } from "motion/react";
import { FIELDS, RESIDENTS, initialsOf, toneFor, type Field, type Resident } from "@/data/residents";
import Dossier from "./Dossier";

// Hand-placed feel: each polaroid gets its own tilt, nudge and fastener.
const TILTS = [-4, 3, -2, 5, -3, 2, 4, -5, 1, -3, 3, -1, 5, -4, 2, -2];
const NUDGE = [0, 14, -6, 20, 4, -10, 12, -4, 18, 0, -8, 10, -2, 16, 6, -12];
const PIN_COLOURS = ["#a3423c", "#c9a45c", "#6f8a63", "#7b6aa8", "#d98b6f"];

type Fastener = { kind: "pin"; colour: string } | { kind: "tape" };

const fastenerFor = (i: number): Fastener =>
  i % 4 === 2 ? { kind: "tape" } : { kind: "pin", colour: PIN_COLOURS[i % PIN_COLOURS.length] };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: -60, scale: 1.12, rotate: 0 },
  shown: ({ i, tilt }: { i: number; tilt: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: tilt,
    transition: { type: "spring", stiffness: 190, damping: 17, delay: Math.min(i * 0.06, 0.8) },
  }),
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
};

type Filter = Field | "All";

/** Dragging only with a mouse or trackpad, so touch screens keep normal scrolling. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

function matches(r: Resident, q: string) {
  if (!q) return true;
  const hay = `${r.founder} ${r.company} ${r.oneLiner} ${r.field}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((word) => hay.includes(word));
}

export default function FounderWall() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "0px 0px -10% 0px" });

  const visible = useMemo(
    () => RESIDENTS.filter((r) => (filter === "All" || r.field === filter) && matches(r, query.trim())),
    [filter, query],
  );

  const counts = useMemo(() => {
    const c = new Map<Filter, number>([["All", RESIDENTS.length]]);
    for (const r of RESIDENTS) c.set(r.field, (c.get(r.field) ?? 0) + 1);
    return c;
  }, []);

  const canDrag = useFinePointer();

  // Hold the board at its full height while filtering, so the page length,
  // and every sticker pinned around it, stays put.
  const [fullHeight, setFullHeight] = useState<number>();
  const showingAll = visible.length === RESIDENTS.length;
  useEffect(() => {
    const el = gridRef.current;
    if (!el || !showingAll) return;
    const measure = () => setFullHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showingAll]);

  const reset = () => {
    setFilter("All");
    setQuery("");
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="board" id="founders" aria-labelledby="founders-title" ref={boardRef}>
        <h2 className="sr-only" id="founders-title">
          The residents
        </h2>

        <div className="controls">
          <div className="chips" role="group" aria-label="Filter by field">
            {(["All", ...FIELDS] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                <span className="chip-label">{f}</span>
                <span className="chip-count">{counts.get(f) ?? 0}</span>
              </button>
            ))}
          </div>

          <label className="search">
            <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
              <circle cx="6" cy="6" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.5 9.5 13 13" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="sr-only">Search residents</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search founders, companies…"
              autoComplete="off"
            />
          </label>
        </div>

        <div className="pins-wrap" style={showingAll ? undefined : { minHeight: fullHeight }}>
        <ul className="pins" ref={gridRef}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((r, i) => {
              const n = RESIDENTS.indexOf(r);
              return (
                <Card
                  key={r.founder}
                  resident={r}
                  tone={toneFor(n)}
                  tilt={TILTS[n % TILTS.length]}
                  nudge={NUDGE[n % NUDGE.length]}
                  fastener={fastenerFor(n)}
                  index={i}
                  play={inView}
                  dragBounds={boardRef}
                  canDrag={canDrag}
                  onOpen={() => setOpenIndex(i)}
                />
              );
            })}
          </AnimatePresence>
        </ul>

        {visible.length === 0 && (
          <div className="empty">
            <p>No residents match {query ? <>&ldquo;{query}&rdquo;</> : "that field"}.</p>
            <button type="button" onClick={reset}>
              Clear search and filters
            </button>
          </div>
        )}
        </div>
      </section>

      <Dossier
        residents={visible}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </MotionConfig>
  );
}

function Card({
  resident: r,
  tone,
  tilt,
  nudge,
  fastener,
  index,
  play,
  dragBounds,
  canDrag,
  onOpen,
}: {
  resident: Resident;
  tone: string;
  tilt: number;
  nudge: number;
  fastener: Fastener;
  index: number;
  play: boolean;
  dragBounds: React.RefObject<HTMLDivElement | null>;
  canDrag: boolean;
  onOpen: () => void;
}) {
  // Stagger by first position only, so filtering doesn't replay the entrance.
  const [enterIndex] = useState(index);
  // A drag ends with a click; swallow it so dragging doesn't open the profile.
  const dragged = useRef(false);

  const open = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    onOpen();
  };

  return (
    <motion.li
      layout
      className={r.photo ? "polaroid has-photo" : "polaroid"}
      data-tone={tone}
      style={{ marginTop: nudge }}
      variants={cardVariants}
      custom={{ i: enterIndex, tilt }}
      initial="hidden"
      animate={play ? "shown" : "hidden"}
      exit="exit"
      drag={canDrag}
      dragConstraints={dragBounds}
      dragElastic={0.12}
      dragMomentum={false}
      onDragStart={() => (dragged.current = true)}
      whileHover={{ rotate: 0, scale: 1.05, y: -6, zIndex: 5 }}
      whileDrag={{ rotate: 0, scale: 1.1, zIndex: 20, cursor: "grabbing" }}
      transition={{ layout: { type: "spring", stiffness: 260, damping: 30 } }}
    >
      {fastener.kind === "pin" ? (
        <span className="pin" style={{ "--pin": fastener.colour } as React.CSSProperties} aria-hidden="true" />
      ) : (
        <span className="tape tape-top" aria-hidden="true" />
      )}

      <button
        type="button"
        className="polaroid-hit"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`Read more about ${r.founder}, ${r.company}`}
      >
        {r.photo ? (
          <span className="polaroid-print">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.photo} alt={r.founder} width={648} height={900} loading="lazy" draggable={false} />
            <span className="polaroid-field">{r.field}</span>
          </span>
        ) : (
          <span className="polaroid-photo">
            <span className="polaroid-mono" aria-hidden="true">
              {initialsOf(r.founder)}
            </span>
            <span className="polaroid-field">{r.field}</span>
          </span>
        )}
        <span className="polaroid-name">{r.founder}</span>
        <span className="polaroid-co">{r.company}</span>
      </button>

      <div className="polaroid-opts">
        <button type="button" onClick={open} aria-haspopup="dialog" aria-label={`More about ${r.founder}`}>
          More
        </button>
        {r.site && (
          <a href={`https://${r.site}`} target="_blank" rel="noreferrer" aria-label={`${r.company} website`}>
            Site ↗
          </a>
        )}
        {(r.x || r.companyX) && (
          <a href={`https://x.com/${r.x ?? r.companyX}`} target="_blank" rel="noreferrer" aria-label={`${r.founder} on X`}>
            X ↗
          </a>
        )}
      </div>
    </motion.li>
  );
}
