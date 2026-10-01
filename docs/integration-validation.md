# Integrated timer validation — SHO-100

Verified 2026-10-02 (Asia/Tokyo), after source and toolchain prerequisite tasks both settled successfully. All requested checks and the production browser smoke pass. Changes remain uncommitted; no push, Linear write, deployment, or Chromatic upload was performed.

## Environment and reproducible commands

Windows PowerShell; pinned Node **24.21.0**, pnpm **12.8.1**. The existing temporary toolchain bootstrap was used; installed host Node **24.13.0** and global tools were unchanged. Browser automation uses temporary Playwright **1.63.0**, with the existing Microsoft Edge **154.0.4258.48** in headless mode. No browser or global package was installed or upgraded.

```powershell
$env:PATH="$env:TEMP/timer-toolchain-bootstrap/node_modules/node/bin;$env:TEMP/timer-toolchain-bootstrap/node_modules/pnpm;$env:PATH"
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm check:ci
pnpm type-check
pnpm test --run
pnpm coverage
pnpm build
pnpm build-storybook
```

| Command | Actual result |
| --- | --- |
| `pnpm install --frozen-lockfile` | Exit 0; lockfile policies pass, resolution skipped; pnpm 12.8.1 |
| `pnpm check:ci` | Exit 0; 59 source/Storybook files, no fixes |
| `pnpm type-check` | Exit 0; application and root/Storybook no-emit checks |
| `pnpm test --run` | Exit 0; 13 files, 42 tests passed |
| `pnpm coverage` | Exit 0; same 42 tests; statements 95.48%, branches 78.57%, functions 94%, lines 95.97% |
| `pnpm build` | Exit 0; Vite 8.3.2; JS 416.62 kB / gzip 133.42 kB, CSS 94.09 kB / gzip 15.85 kB; manifest/registration/service worker/Workbox generated; 12 precache entries, 577.05 KiB |
| `pnpm build-storybook` | Exit 0; Storybook 10.6.1, Vite 8.3.2 preview build |

The full suite first passed before integration fixes. Lint and production build (which includes both type checks) passed again after final source changes; tests, coverage, and Storybook were rerun after those changes and passed. Frozen installation remains unchanged because integration did not change package metadata or lockfile.

```powershell
# Separate preview process:
pnpm preview --host 127.0.0.1 --port 4173

# Temporary browser dependency, outside the repository:
npm install --prefix "$env:TEMP/timer-browser-validation" --no-package-lock playwright@1.63.0
$env:PLAYWRIGHT_MODULE="$env:TEMP/timer-browser-validation/node_modules/playwright"
node docs/browser-smoke.cjs
```

The script resolves Playwright using `PLAYWRIGHT_MODULE`, launches the installed Edge channel, and writes [machine-readable results](browser-evidence/results.json) and screenshots. It uses a new browser context, real DOM actions, real timer delays, actual media playback wrapped for call evidence, and assertion failures cause a nonzero exit. Preview and browser processes were stopped after validation; temporary bootstrap/package directories remain outside the repo for reuse.

## Browser evidence

Production URL: `http://127.0.0.1:4173/timer/`. Final smoke exit **0**, page exceptions **0**, HTTP responses >=400 **0**.

| Case | Verified behavior |
| --- | --- |
| Countdown | Edit hours/minutes/seconds through native selects, confirm numeric duration; title edit; start decreases time; pause remains stable for 1.2s; resume decreases time; reset restores configured 12s |
| Expiry/audio | 1s timer reaches zero; alarm `play()` invoked exactly once; audio readyState 4 with no media error; click/alarm playback starts at currentTime 0; both resolved sources are under `/timer/` |
| Stopwatch | Add, start, pause, resume, reset to zero, delete |
| Timer collection | Add countdown and delete; card counts change correctly |
| Persistence | Reload retains countdown title/duration and timer types, theme `winter`, and dismissed `isFirst` tour marker; elapsed running state is intentionally not persisted |
| Old persisted format | Seed original raw `timerList` array with string-valued `{hours:'1',minutes:'2',seconds:'3'}`, numeric 12s countdown, and stopwatch without timerValue; all three hydrate; old string timer starts via Enter, pauses via Space, resets, and editing writes numbers |
| Tour | New user sees first welcome step; all seven steps advance and finish; a fresh tour can be skipped; reload does not show a dismissed tour |
| Theme/menu | `winter`, the last of 29 preserved themes, reachable at desktop and 390px; theme restores on reload; menu scrolls within the viewport |
| Responsive digits | All six digits and unit markers fit at 320px/390px; zero and 10+ values render once; counter transitions settle before final screenshots; compact header/control labels fit English and exact `ja` locale |
| PWA | Manifest and both icons return 200; active SW is `/timer/sw.js` with `/timer/` scope; offline reload renders three saved cards |
| Offline audio | Both MP3 URLs are explicitly present in Workbox precache Cache Storage, with revision keys; offline `fetch(..., {cache:'no-store'})` succeeds for both through the service worker, rather than relying on warm HTTP media cache |

Reviewed final screenshots: [desktop](browser-evidence/desktop.png), [390px mobile](browser-evidence/mobile.png), [320px mobile](browser-evidence/mobile-320.png), [Japanese 320px](browser-evidence/mobile-ja-320.png), and [first tour step](browser-evidence/tour.png).

## Integration fixes and audit decisions

- Reproduced unreachable last Theme option on mobile: bounded the submenu height, enabled vertical scrolling, aligned it to the right, and supplied explicit stacking order. Add Timer remained functional.
- Reproduced clipped large countdown digits on small cards: added responsive counter sizing and a monospace font, then visually verified settled complete glyphs. Compacted narrow-screen header and action labels so Japanese controls fit as well.
- Added MP3s to PWA precache using explicit Workbox file patterns, preserving offline alarm/click resources.
- Corrected `.gitignore` from the accidentally joined `src-tauri/target//coverage/` to separate target and root coverage exclusions; `git check-ignore coverage/index.html` passes.
- Verified the official Chromatic `v1` tag is deprecated and uses Node 20. Changed to exact `chromaui/action@v18.10.1`, whose [official action source](https://raw.githubusercontent.com/chromaui/action/v18.10.1/action.yml) uses Node 24; added `fetch-depth: 0` following [official workflow guidance](https://www.chromatic.com/docs/github-actions/). Existing PR-only trigger and secret handling are preserved.

Inspected all direct dependency pins/removals/exceptions against [toolchain-migration.md](toolchain-migration.md), package.json, lockfile and source. Retained packages are exact latest-stable pins recorded in that registry audit; removed react-daisyui/react-use and old Storybook/PostCSS/Tailwind packages have migrated replacements. No additional direct dependency exception was needed. pnpm build allowance remains only esbuild, with exact age exceptions only for Vite 8.3.2 and @chromatic-com/storybook 5.4.0; frozen install proved these current policies work, so speculative broader permissions/age bypasses were rejected.

Repository package.json, workflows and README contain no Volta setup/pins; `.node-version` and packageManager pin the project runtime. CI installs frozen, checks lint/types/coverage and both builds; Pages continues to publish `dist` at `/timer/`. New `.node-version`, pnpm-workspace.yaml, tests and docs are intentionally untracked deliverables in this no-commit task and must be included in a future user-owned commit.

A user-owned `mise.toml` appeared during validation, with a major-line pnpm 12 setting; it was preserved without edits. Validation uses the exact temporary pnpm 12.8.1 path above, independent of that file.

## Known limits

- Local preview verifies the production base path, generated assets and service worker; GitHub Actions execution, live Pages deployment and Chromatic remote publishing were not run.
- Browser coverage is installed Edge on Windows, desktop 1440px and mobile viewports 320px/390px; no Safari, Firefox, physical mobile-device, screen-reader, or audible speaker assessment. Playback calls and decoded assets are verified; a headless browser does not prove perceived sound volume.
- Existing locale selection accepts exact `ja`/`en`; regional `ja-JP` falls back to English. Exact Japanese rendering was tested and asserted without changing this pre-existing policy; the coordinator tracks the regional-locale follow-up as SHO-101.
- Existing malformed-storage/private-mode failure handling is outside this migration; original valid persisted numeric/string formats were tested.
- Coverage reports imported/touched files, not exhaustive application coverage. Remaining nonblocking build warnings: old transitive caniuse-lite data, optional MDX glob with no matching stories, and large Storybook documentation/explorer chunks.
