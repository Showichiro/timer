# timer

[![deploy-status-badge](https://github.com/Showichiro/timer/actions/workflows/deploy-pages.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/deploy-pages.yaml)
[![check](https://github.com/Showichiro/timer/actions/workflows/check.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/check.yaml)
[![Chromatic](https://github.com/Showichiro/timer/actions/workflows/chromatic.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/chromatic.yaml)

Countdown / Stopwatch timer application. You can set as many timers as you want. The timers are stored in local storage, so they are not lost even if you close the browser.

## production

[Production Environment](https://showichiro.github.io/timer/)

## development

### requirement

Use Node.js 24 LTS (the exact version is in `.node-version`) and pnpm 12.8.1.
Install Node from [nodejs.org](https://nodejs.org/), then install the pinned package manager:

```shell
npm install --global pnpm@12.8.1
```

For a bootstrap without a global pnpm installation, use `npm exec --yes --package=pnpm@12.8.1 -- pnpm <command>` with the same commands below.

### Dev server

```shell
pnpm i --frozen-lockfile
pnpm dev
```

### test

```shell
pnpm test
```

### storybook

```shell
pnpm storybook
```

### check (format & lint)

```shell
pnpm check
```

### Validation

Run `pnpm type-check`, `pnpm check:ci`, `pnpm test --run`, `pnpm coverage`, `pnpm build`, and `pnpm build-storybook`. The app remains deployed at `/timer/` and uses local storage for saved timers.

See [the migration report](docs/toolchain-migration.md) for dependency versions and migration evidence.
