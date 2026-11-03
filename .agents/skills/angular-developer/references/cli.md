# Angular CLI Guide for Agents

Nx is the primary workspace runner. Use Nx targets for serving, building, testing, and linting; application target configuration lives in `apps/web/project.json`. Use Angular generators through Nx when scaffolding project code.

## 1. Managing Dependencies

Use `ng add` for Angular libraries that provide setup schematics, and use npm for ordinary dependency changes.

```bash
ng add @angular/material
ng add tailwindcss
ng add @angular/fire
```

To update the application and its dependencies (which automatically runs code migrations):

```bash
ng update @angular/core@<latest or specific version> @angular/cli<latest or specific version>
```

## 2. Generating Code (`ng generate` or `ng g`)

Always use the CLI to generate code to ensure it adheres to Angular standards and updates necessary configuration files automatically.

| Target    | Command                                                     | Notes                            |
| :-------- | :---------------------------------------------------------- | :------------------------------- |
| Component | `npx nx g @nx/angular:component path/to/name --project=web` | Generates a component.           |
| Service   | `npx nx g @nx/angular:service path/to/name --project=web`   | Generates an injectable service. |
| Directive | `npx nx g @nx/angular:directive path/to/name --project=web` | Generates a directive.           |
| Pipe      | `npx nx g @nx/angular:pipe path/to/name --project=web`      | Generates a pipe.                |

_Note: There is no command to generate a single route definition. Generate a component, then manually add it to the `Routes` array in `app.routes.ts`._

## 3. Development Server & Proxying

Start the local development server with hot-module replacement (HMR):

```bash
npx nx serve web
```

### Backend API Proxying

To proxy API requests during development (e.g., rerouting `/api` to a local Node server):

1. Create `apps/web/src/proxy.conf.json`:
   ```json
   {
     "/api/**": { "target": "http://localhost:3000", "secure": false }
   }
   ```
2. Add the proxy configuration to the `serve` target in `apps/web/project.json`:
   ```json
   "serve": {
     "builder": "@angular/build:dev-server",
     "options": { "proxyConfig": "src/proxy.conf.json" }
   }
   ```

## 4. Building the Application

Compile the application into `dist/apps/web/browser`. Modern Angular uses the `@angular/build:application` builder (esbuild-based).

```bash
npx nx build web
```

- `npx nx build web` defaults to the production configuration, which enables Ahead-of-Time (AOT) compilation, minification, and tree-shaking.
- Target specific configurations defined in `apps/web/project.json` using `--configuration`: `npx nx build web --configuration=development`.

## 5. Testing

- **Unit Tests**: Run `npx nx test web` to execute unit tests with Vitest.
- **End-to-End (E2E)**: Run `npx nx e2e web-e2e` to execute Playwright tests.

## 6. Deployment

To deploy an application, you must first add a deployment builder, then run the deploy command:

```bash
# Example for Firebase
ng add @angular/fire
ng deploy
```
