# End-to-End (E2E) Testing

This workspace uses Playwright for browser-based end-to-end testing. Tests live
in `apps/web-e2e/src`, and Nx starts the web app while running them.

Run the E2E project with:

```shell
npx nx e2e web-e2e
```

Install Playwright browsers when needed:

```shell
npx playwright install
```
