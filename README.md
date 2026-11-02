# PBD

Angular application in an Nx integrated monorepo.

## Requirements

- Node.js 24+
- npm 11+

## Getting started

```sh
npm ci
npx nx serve web
```

The app is available at `http://localhost:4200`.

## Nx tasks

```sh
npx nx build web
npx nx test web
npx nx e2e web-e2e
npx nx graph
```

## Workspace layout

- `apps/web`: Angular application
- `apps/web-e2e`: Playwright end-to-end tests
- `libs/`: shared libraries can be generated here as the solution grows

Generate additional Angular projects with Nx, for example:

```sh
npx nx g @nx/angular:library shared-ui
```
