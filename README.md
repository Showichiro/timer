# timer

[![deploy-status-badge](https://github.com/Showichiro/timer/actions/workflows/deploy-pages.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/deploy-pages.yaml)
[![check](https://github.com/Showichiro/timer/actions/workflows/check.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/check.yaml)
[![Chromatic](https://github.com/Showichiro/timer/actions/workflows/chromatic.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/chromatic.yaml)

Countdown / Stopwatch timer application. You can set as many timers as you want. The timers are stored in local storage, so they are not lost even if you close the browser.

## production

[Production Environment](https://showichiro.github.io/timer/)


## development

### requirement

nodejs must be installed. If you are using `nvm`, you can install the specified version of nodejs with the following command.

```shell
nvm install
nvm use
```

The project's package manager uses pnpm. The version of pnpm is specified by corepack, and the following command is entered.

```shell
corepack enable pnpm
pnpm -v
```

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

### check(format & lint)

```shell
pnpm check
```