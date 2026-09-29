"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { RESIDENTS, initialsOf, toneFor, type Resident } from "@/data/residents";

const EASE = [0.19, 1, 0.22, 1] as const;

type Tab = "building" | "find";

/** On phones the profile opens as a bottom sheet instead of a side panel. */
function usePhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 600px)");
    const update = () => setPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return phone;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "building", label: "What they’re building" },
  { id: "find", label: "Find them" },
];

export default function Dossier({
  residents,
  index,
  onChange,
  onClose,
}: {
  residents: Resident[];
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const r = index === null ? null : residents[index] ?? null;
  const [tab, setTab] = useState<Tab>("building");
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = r !== null;
  const phone = usePhone();
  const drag = useDragControls();
  const count = residents.length;

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    onChange((index + dir + count) % count);
  };

  // Focus, scroll lock and keyboard while open.
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <AnimatePresence>
      {r && (
        <>
          <motion.div
            key="backdrop"
            className="dossier-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.aside
            key="panel"
            className="dossier"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-name"
            data-tone={toneFor(RESIDENTS.indexOf(r))}
            initial={phone ? { y: "100%" } : { x: "104%" }}
            animate={phone ? { y: 0 } : { x: 0 }}
            exit={phone ? { y: "100%" } : { x: "104%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            drag={phone ? "y" : false}
            dragListener={false}
            dragControls={drag}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose();
            }}
          >
            {phone && (
              <div className="sheet-grip" onPointerDown={(e) => drag.start(e)} aria-hidden="true">
                <span />
              </div>
            )}
            <div className="dossier-top" onPointerDown={(e) => phone && drag.start(e)}>
              <span className="dossier-count">
                {index! + 1} / {count}
              </span>
              <div className="dossier-nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous founder">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next founder">
                  →
                </button>
                <button type="button" ref={closeRef} onClick={onClose} aria-label="Close">
                  ✕
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={r.founder}
                className="dossier-content"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <motion.div
                  className={r.photo ? "dossier-hero has-photo" : "dossier-hero"}
                  initial={{ rotate: -10, y: -20, opacity: 0 }}
                  animate={{ rotate: -2, y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}
                >
                  {r.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.photo} alt={r.founder} width={648} height={733} />
                  ) : (
                    <>
                      <span className="dossier-photo">
                        <span className="dossier-mono" aria-hidden="true">
                          {initialsOf(r.founder)}
                        </span>
                        <span className="polaroid-field">{r.field}</span>
                      </span>
                      <span className="dossier-caption" aria-hidden="true">
                        {r.founder.split(" ")[0]}
                      </span>
                    </>
                  )}
                </motion.div>

                <h2 className="dossier-name" id="dossier-name">
                  {r.founder}
                </h2>
                <p className="dossier-company">
                  {r.company}
                </p>

                <div className="tabs" role="tablist" aria-label={`About ${r.founder}`}>
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      id={`tab-${t.id}`}
                      aria-selected={tab === t.id}
                      aria-controls={`panel-${t.id}`}
                      className="tab"
                      onClick={() => setTab(t.id)}
                    >
                      {tab === t.id && (
                        <motion.span
                          layoutId="tab-fill"
                          className="tab-fill"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="tab-label">{t.label}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    role="tabpanel"
                    id={`panel-${tab}`}
                    aria-labelledby={`tab-${tab}`}
                    className="tab-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {tab === "building" ? <Building r={r} /> : <FindThem r={r} />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Building({ r }: { r: Resident }) {
  return (
    <>
      <p className="dossier-line">{r.oneLiner}</p>
      <p className="dossier-about">{r.about}</p>
    </>
  );
}

function FindThem({ r }: { r: Resident }) {
  const rows: { label: string; value?: string; href?: string }[] = [
    { label: "Website", value: r.site, href: r.site && `https://${r.site}` },
    { label: `${r.founder.split(" ")[0]} on X`, value: r.x && `@${r.x}`, href: r.x && `https://x.com/${r.x}` },
    {
      label: `${r.company} on X`,
      value: r.companyX && `@${r.companyX}`,
      href: r.companyX && `https://x.com/${r.companyX}`,
    },
  ];

  return (
    <ul className="links">
      {rows.map((row) => (
        <li key={row.label}>
          {row.href ? (
            <a href={row.href} target="_blank" rel="noreferrer" className="link-row">
              <span className="link-label">{row.label}</span>
              <span className="link-value">
                {row.value} <span aria-hidden="true">↗</span>
              </span>
            </a>
          ) : (
            <span className="link-row is-missing">
              <span className="link-label">{row.label}</span>
              <span className="link-value">Not shared yet</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
