# madsjulia.github.io (modernized)

This repo is a **static-exported** Next.js site (`output: "export"`) deployed to GitHub Pages.

## Requirements

- Node.js **20 or 22** (Next.js does not reliably work on Node 24 yet)

If you use `nvm`/`nvm-windows`, the repo includes `.nvmrc`.

## Local dev

- `npm install`
- `npm run dev`

## Production preview (static)

Because this is a static export, `next start` is not used.

- `npm run build` (generates `out/`)
- `npm start` (serves `out/` via `serve`)
