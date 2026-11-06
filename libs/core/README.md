# Core

Shared Angular infrastructure and UI used by the web host and profile remote.

Import public APIs from `@pbd/core`. The library includes authentication, guards,
HTTP interceptors, shared models and services, shell components, and shared UI
components.

Applications must provide `API_BASE_URL` in their app configuration. Applications
that render `Header` must also provide `HEADER_CART`.
