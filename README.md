# Catalogo Streaming — Starter CI-ready (Modulo 5)

È il progetto del catalogo streaming, già predisposto per i lab di **automazione**:
lint, test con coverage e un E2E Playwright passano "verdi". Nel Lab 1 generi la **CI**
con l'AI; nel Lab 2 configuri **PR review Copilot** e **quality gate**.

<!-- Lab 1 — Parte B: incolla qui il badge dopo aver creato il workflow e il repo
![CI](https://github.com/USER/REPO/actions/workflows/ci.yml/badge.svg) -->

## Prerequisiti (prima della sessione)
```bash
node --version          # >= 22
npm ci                  # installa le dipendenze
npm run lint            # Biome: nessun errore
npm test                # Vitest: verde
npm run test:coverage   # coverage >= 80% (gate)
```
Per l'E2E in locale: `npm run e2e` (i test usano la fixture `request`, **niente browser**).

## Script
| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | API su http://localhost:3000 |
| `npm run lint` | Biome (lint + format check) |
| `npm test` | Vitest |
| `npm run test:coverage` | Vitest + coverage (gate 80%) |
| `npm run e2e` | Playwright a livello API (avvia l'app da solo) |
| `npm run build` | Compila TypeScript |

## Lab 1 — CI Pipeline (cosa generare)
Workflow `.github/workflows/ci.yml` con: trigger su push/PR su main, `ubuntu-latest`,
checkout + setup Node 22, `npm ci`, `npm run lint`, `npm run test:coverage`, `npm run e2e`,
caching con `actions/cache`, e una **matrix** `node-version: [20, 22, 24]`.
La cartella `.github/workflows/` è vuota di proposito: il file lo crei tu.

## Lab 2 — PR Review + Quality Gate
- crea `.github/copilot-instructions.md` con le regole del team;
- crea un branch con codice problematico (l'esempio `getUser` della guida), apri una PR e
  aggiungi Copilot come reviewer (`gh pr edit --add-reviewer @copilot`);
- configura la branch protection (status check `ci`, review richiesta) e verifica che il
  merge sia bloccato finché il gate non è soddisfatto.

> Per i lab serve un account Copilot/Claude attivo e la GitHub CLI autenticata (`gh auth login`),
> più un tuo repo GitHub personale (`gh repo create catalogo-streaming --public --source=. --push`).
