# Catalogo Streaming (CI-ready) — Contesto per Claude Code / Copilot

API Node + Express 5 + TypeScript del catalogo streaming, predisposta per i lab di
automazione del Modulo 5 (CI/CD, PR review, quality gate). Codice e test sono già verdi;
qui si lavora su **pipeline e processo**, non sulla logica applicativa.

## Comandi esatti (usali nel workflow CI)
- Install: `npm ci`
- Lint: `npm run lint`        (Biome)
- Test: `npm test`            (Vitest)
- Coverage (gate 80%): `npm run test:coverage`
- E2E API: `npm run e2e`      (Playwright fixture `request`, nessun browser)
- Build: `npm run build`
- Dev: `npm run dev`          (http://localhost:3000)

## CI da generare (Lab 1)
`.github/workflows/ci.yml`:
- trigger: `push` e `pull_request` su `main`
- `runs-on: ubuntu-latest`
- step: `actions/checkout@v6`, `actions/setup-node@v6` (node 22, `cache: npm`), `npm ci`,
  `npm run lint`, `npm run test:coverage`, `npm run e2e`
- `actions/cache` per `node_modules` (key su hash di `package-lock.json`)
- `strategy.matrix.node-version: [20, 22, 24]`

## Struttura
- `src/services/contentService.ts`, `src/repository/contentRepository.ts`, `src/routes/contents.ts`
- `src/utils/` (validazione, format, paginazione) · `src/tests/` (Vitest)
- `e2e/` (Playwright API) · `playwright.config.ts` (con `webServer`)
- `.github/workflows/` (vuota: il `ci.yml` lo generi nel Lab 1)

## Convenzioni
- TypeScript strict; errori HTTP in formato Problem Details (RFC 9457).
- Coverage minima 80% (configurata in `vitest.config.ts`).
