---
name: deploy-to-vercel
description: Deploy the D2A web app (d2a-web/) to Vercel — verify the build, keep secrets out of git, push, import the repo, set the Root Directory and environment variables, and tune the function duration to the plan. Use when someone asks to "deploy", "ship to Vercel", or "put it live".
---

# Deploy d2a-web to Vercel

The deployable app is the **`d2a-web/`** subfolder. Set Vercel's **Root Directory** to `d2a-web`.

## 1 — Pre-flight
```bash
cd d2a-web
npm run build                 # must be green (types valid)
```
- Confirm **no secrets are committed**: `git ls-files | grep -i env` must be empty. `.env.local` is
  git-ignored — keep it that way.

## 2 — Push to GitHub (if not already)
```bash
git add -A && git commit -m "deploy: d2a-web"
gh repo create <name> --public --source . --remote origin --push    # or --private
```

## 3 — Import to Vercel
1. vercel.com → **Add New… → Project** → import the repo.
2. **Root Directory** → `d2a-web` (Framework preset auto-detects Next.js).
3. **Environment Variables**:
   - `ANTHROPIC_API_KEY` = your key (**required**).
   - optional: `MODEL` (`claude-sonnet-4-6` default, `claude-opus-4-8` for depth),
     `ENABLE_WEB_SEARCH` (`true`/`false`), `WEB_SEARCH_TOOL`.
4. **Deploy.** Note the public URL.

## 4 — Function duration (important for research mode)
The research agent can take ~1–4 min. `app/api/run/route.ts` sets `maxDuration = 300`. Match your plan:
**Hobby ≈ 60s, Pro = 300s, Enterprise = 900s.** If on Hobby, either lower `maxDuration` or set
`ENABLE_WEB_SEARCH=false` so sweeps finish in ~30s. Fluid Compute (default) covers the long stream.

## 5 — CLI alternative
```bash
npm i -g vercel
cd d2a-web
vercel                # link; set Root Directory to "." (you're inside d2a-web)
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

## 6 — Verify
- Open the URL → console renders → **Run sweep** populates the ABCD board.
- If `/api/run` errors with a missing key, set `ANTHROPIC_API_KEY` in Vercel and redeploy.
