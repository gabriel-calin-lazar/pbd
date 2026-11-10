# Core

Shared Angular infrastructure and UI used by the web host and profile remote.

Import public APIs from `@pbd/core`. The library includes authentication, guards,
HTTP interceptors, shared models and services, and shared UI components. The web
host's shell components live in `apps/web/src/app/components`.

Applications must provide `API_BASE_URL` in their app configuration. Applications
that render the web host's `Header` must also provide `HEADER_CART`.
