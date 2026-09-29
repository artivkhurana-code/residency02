# Forma — The Residency, Season 02

The resident directory for Forma's second Residency in Bristol: one
chocolate moodboard: sticky notes up top, pastel polaroids pinned below,
keepsake stickers scattered around, one per founder, each opening a profile with their
company, one-liner, website and X.

## Run it

```
npm install
npm run dev        # → http://localhost:3002
npm run build && npm start
```

## Edit the residents

Everything lives in `data/residents.ts`, one object per founder:
`founder`, `company`, `oneLiner`, `about` (shown when a row is opened),
`field` (drives the filter chips), and optional `site` (bare domain),
`x` (founder handle) and `companyX` (company handle), both without the `@`.
Leave a link out and the profile shows "Not shared yet".

Sources: the S2 Candidate Board (Offer section, blurbs and links only) and
the verified S2 X Handles sheet. One-liners are provisional copy.

## Structure

- `app/page.tsx` — topbar, hero, board, footer
- `components/Notes.tsx` — the three sticky notes (season, Meet the audacious, intro line)
- `components/Stickers.tsx` — scattered stickers: badge, stamp, sparkles, pegasus, computer
- `components/FounderWall.tsx` — the board: filters, search, draggable pinned polaroids (drag on mouse/trackpad only)
- `components/Dossier.tsx` — slide-over profile with tabs and prev/next (arrow keys, Esc)
- `components/Spotlight.tsx` — soft light that follows the cursor across the felt
- `public/stickers/` — RESIDENCY wordmark (recoloured to cream, transparent), pegasus, computer
- `app/globals.css` — brand tokens (ink, paper, signal yellow) and all styles;
  reduced-motion safe
