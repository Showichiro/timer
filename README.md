# timer

[![deploy-status-badge](https://github.com/Showichiro/timer/actions/workflows/deploy-pages.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/deploy-pages.yaml)
[![check](https://github.com/Showichiro/timer/actions/workflows/check.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/check.yaml)
[![Chromatic](https://github.com/Showichiro/timer/actions/workflows/chromatic.yaml/badge.svg)](https://github.com/Showichiro/timer/actions/workflows/chromatic.yaml)

Countdown / Stopwatch timer application. You can set as many timers as you want. The timers are stored in local storage, so they are not lost even if you close the browser.

## production

[Production Environment](https://showichiro.github.io/timer/)


## development

### requirement

Node.js installation is required. It is recommended to use [Volta](https://volta.sh) to install Node.js.

```shell
# Install Volta
curl https://get.volta.sh | bash

# Install Node.js
volta install node

# Install corepack
volta install corepack

# Enable pnpm
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

### check (format & lint)

```shell
pnpm check
```
