# Toolchain migration — SHO-98

Verified 2026-10-02 (Asia/Tokyo). Parent SHO-97; source migration SHO-99; integration SHO-100.

## Runtime and dependency policy

All retained direct dependencies are exact-pinned to the npm registry `latest` stable release verified during this migration. Versions already at latest remain unchanged. Package metadata, engine requirements, and peer ranges were read from `https://registry.npmjs.org/<package>/latest`; registry package links below are the reproducible evidence.

The [official Node distribution index](https://nodejs.org/dist/index.json) identifies Node 24.21.0 (2026-09-07) as Krypton LTS. Node 24.21.0 is pinned in `.node-version`; engines require Node >=24.15.0 <25 because jsdom 30.1.1 requires ^24.15.0 on this LTS line. pnpm 12.8.1 is pinned in `packageManager`, engines, and CI. Host Node 24.13.0 and other global tools were left installed.

| Package | Installed / latest | Evidence |
| --- | --- | --- |
| `clsx` | 2.1.1 | [registry](https://registry.npmjs.org/clsx/latest) |
| `i18next` | 26.4.2 | [registry](https://registry.npmjs.org/i18next/latest) |
| `jotai` | 3.0.1 | [registry](https://registry.npmjs.org/jotai/latest) |
| `jotai-optics` | 0.4.0 | [registry](https://registry.npmjs.org/jotai-optics/latest) |
| `optics-ts` | 2.4.1 | [registry](https://registry.npmjs.org/optics-ts/latest) |
| `react` | 19.3.0 | [registry](https://registry.npmjs.org/react/latest) |
| `react-dom` | 19.3.0 | [registry](https://registry.npmjs.org/react-dom/latest) |
| `react-hook-form` | 7.89.0 | [registry](https://registry.npmjs.org/react-hook-form/latest) |
| `react-i18next` | 17.0.15 | [registry](https://registry.npmjs.org/react-i18next/latest) |
| `react-joyride` | 3.2.0 | [registry](https://registry.npmjs.org/react-joyride/latest) |
| `react-timer-hook` | 4.0.6 | [registry](https://registry.npmjs.org/react-timer-hook/latest) |
| `theme-change` | 3.0.4 | [registry](https://registry.npmjs.org/theme-change/latest) |
| `@biomejs/biome` | 2.5.15 | [registry](https://registry.npmjs.org/@biomejs/biome/latest) |
| `@chromatic-com/storybook` | 5.4.0 | [registry](https://registry.npmjs.org/@chromatic-com/storybook/latest) |
| `@storybook/addon-links` | 10.6.1 | [registry](https://registry.npmjs.org/@storybook/addon-links/latest) |
| `@storybook/addon-onboarding` | 10.6.1 | [registry](https://registry.npmjs.org/@storybook/addon-onboarding/latest) |
| `@storybook/react` | 10.6.1 | [registry](https://registry.npmjs.org/@storybook/react/latest) |
| `@storybook/react-vite` | 10.6.1 | [registry](https://registry.npmjs.org/@storybook/react-vite/latest) |
| `@testing-library/jest-dom` | 7.0.1 | [registry](https://registry.npmjs.org/@testing-library/jest-dom/latest) |
| `@testing-library/react` | 16.3.3 | [registry](https://registry.npmjs.org/@testing-library/react/latest) |
| `@testing-library/user-event` | 14.6.7 | [registry](https://registry.npmjs.org/@testing-library/user-event/latest) |
| `@types/react` | 19.3.0 | [registry](https://registry.npmjs.org/@types/react/latest) |
| `@types/react-dom` | 19.3.0 | [registry](https://registry.npmjs.org/@types/react-dom/latest) |
| `@vitejs/plugin-react` | 6.1.1 | [registry](https://registry.npmjs.org/@vitejs/plugin-react/latest) |
| `chromatic` | 18.10.1 | [registry](https://registry.npmjs.org/chromatic/latest) |
| `daisyui` | 5.7.47 | [registry](https://registry.npmjs.org/daisyui/latest) |
| `jsdom` | 30.1.1 | [registry](https://registry.npmjs.org/jsdom/latest) |
| `rollup-plugin-visualizer` | 7.1.1 | [registry](https://registry.npmjs.org/rollup-plugin-visualizer/latest) |
| `storybook` | 10.6.1 | [registry](https://registry.npmjs.org/storybook/latest) |
| `tailwindcss` | 4.3.3 | [registry](https://registry.npmjs.org/tailwindcss/latest) |
| `typescript` | 7.0.2 | [registry](https://registry.npmjs.org/typescript/latest) |
| `vite` | 8.3.2 | [registry](https://registry.npmjs.org/vite/latest) |
| `vite-plugin-pwa` | 1.3.0 | [registry](https://registry.npmjs.org/vite-plugin-pwa/latest) |
| `vitest` | 5.0.3 | [registry](https://registry.npmjs.org/vitest/latest) |
| `@tailwindcss/vite` | 4.3.3 | [registry](https://registry.npmjs.org/@tailwindcss/vite/latest) |
| `@storybook/addon-docs` | 10.6.1 | [registry](https://registry.npmjs.org/@storybook/addon-docs/latest) |
| `@vitest/coverage-v8` | 5.0.3 | [registry](https://registry.npmjs.org/@vitest/coverage-v8/latest) |
| `@types/node` | 26.6.3 | [registry](https://registry.npmjs.org/@types/node/latest) |

## Removed packages and migrated configuration

- `react-daisyui`: latest 5.0.5 requires daisyUI 4; source worker replaced wrappers with native JSX using daisyUI 5 classes.
- `react-use`: latest 17.6.1 removed with source worker confirmation; native shared audio hook preserves playback semantics.
- `@storybook/test` (latest 8.6.15): superseded by `storybook/test`; story imports migrated by source worker.
- `@storybook/blocks` (latest 8.6.14): obsolete standalone package; Storybook 10 doc blocks use `@storybook/addon-docs/blocks`.
- `@storybook/addon-essentials` and `@storybook/addon-interactions` (latest 8.6.14): incompatible Storybook 8 peers; core Storybook 10 supplies controls/actions/interactions, and explicit `@storybook/addon-docs` preserves autodocs.
- Direct `autoprefixer` and `postcss`: removed with old PostCSS/Tailwind JS configuration; `@tailwindcss/vite` supplies the Tailwind 4 pipeline. Transitive PostCSS remains managed by dependencies.
- Repository runtime-manager pins and corresponding CI/documentation setup were removed; Node and pnpm versions now come from explicit project metadata.

Tailwind 4 uses the Vite plugin and CSS `@import`/daisyUI `@plugin`; source worker owns CSS and preserves the original 29 themes. Biome 2 uses assist import organization, its migrated recommended preset, and CSS Tailwind directive parsing. TypeScript 7 uses Bundler module resolution and removes unsupported `esModuleInterop: false`; separate source and root/Storybook no-emit checks both run in `type-check`. Vite 8 uses `rolldownOptions`; obsolete object-form manual chunking was removed and the visualizer retained.

Storybook configuration remains ESM, uses preview autodocs tags, and filters the nested app PWA plugins from its explorer bundle. This prevents a service worker from controlling Storybook and resolved a Windows native crash after preview bundling. The production app retains PWA auto-update registration, manifest/icons and `/timer/` base. No localStorage keys or timer feature semantics were changed by this toolchain work.

## pnpm installation policy

pnpm 12 requires `allowBuilds`, replacing removed legacy `onlyBuiltDependencies`. Only esbuild is allowed because its install script provisions its platform binary. `minimumReleaseAgeExclude` records exact reviewed versions `vite@8.3.2` and `@chromatic-com/storybook@5.4.0`: both were registry latest stable but newer than pnpm default age gating during this run, so exact exceptions are necessary to meet the requested latest-stable migration. No broad age or script-policy bypass is configured.

## CI actions

Official GitHub latest-release API responses verified the exact tags used: [checkout 7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1), [setup-node 7.0.0](https://github.com/actions/setup-node/releases/tag/v7.0.0), [pnpm/action-setup 6.1.0](https://github.com/pnpm/action-setup/releases/tag/v6.1.0), [upload-pages-artifact 5.0.0](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0), and [deploy-pages 5.0.1](https://github.com/actions/deploy-pages/releases/tag/v5.0.1). Integration corrected the deprecated Chromatic v1 tag to exact v18.10.1 (Node 24) and added full checkout history, following [official Chromatic guidance](https://www.chromatic.com/docs/github-actions/). Check CI runs frozen installation, lint, both type checks, coverage, production build, and Storybook build. Pages deployment still publishes `dist` and preserves deployment permissions/concurrency.

## Validation

Validated with Node 24.21.0 and pnpm 12.8.1 using a temporary bootstrap, without modifying host tools:

```powershell
$env:PATH="$env:TEMP/timer-toolchain-bootstrap/node_modules/node/bin;$env:TEMP/timer-toolchain-bootstrap/node_modules/pnpm;$env:PATH"
pnpm install --frozen-lockfile
pnpm check:ci
pnpm type-check
pnpm build
pnpm coverage
pnpm build-storybook
```

Bootstrap was created with `npm install --prefix "$env:TEMP/timer-toolchain-bootstrap" --no-package-lock node@24.21.0 pnpm@12.8.1`; it is outside the repository. For other environments use the pinned Node version and README package-manager bootstrap.

- Frozen install: passes, lockfile resolution skipped.
- Biome: passes source and Storybook with recommended rules. The migration CLI unexpectedly generated preset none; this was corrected rather than weakening lint. With coordinator ownership extension, seven newly exposed source errors were repaired: the whole count has timer role and readable label; numeric options use value-array keys; short non-speech audio effects have a documented caption-rule exception. Radix and unused catch findings were also resolved.
- TypeScript: both source and root/Storybook checks pass.
- Production build: passes; emits manifest, registration, service worker and Workbox precache (12 entries after integration added audio assets).
- Coverage: passes, 42 tests across 13 files; 95.97% lines and 78.57% branches among covered files. Coverage is a touched/imported-file report, not an assertion of exhaustive app coverage.
- Storybook 10.6.1 build: passes.

Nonblocking warnings remain: transitive Browserslist/caniuse database age in Workbox, large documentation/explorer chunks, and no MDX story files for the existing optional glob. These do not affect frozen installation or build completion. Browser interaction, offline behavior, and deployed path smoke testing are assigned to the integration worker; no remote deployment or Chromatic publishing was performed here.

## Official migration references

- [Tailwind Vite installation](https://tailwindcss.com/docs/installation/using-vite)
- [daisyUI Vite installation](https://daisyui.com/docs/install/vite/) and [theme configuration](https://daisyui.com/docs/config/)
- [Storybook migration guide](https://storybook.js.org/docs/releases/migration-guide)
- [Vite 8 migration](https://vite.dev/guide/migration)
- [Biome import organization](https://biomejs.dev/assist/actions/organize-imports/javascript/)
- [pnpm 11 build-policy migration](https://pnpm.io/blog/releases/11.0)
