# Workspace generators

Generate a Native Federation-ready app slice with:

```sh
npx nx g ./tools/generators/generators.json:app-slice orders
```

The generator creates `apps/orders` and assigns the next available app port. Pass
`--port=4300` to choose a port explicitly. The slice exposes its default-exported
`orders.routes.ts` through `./Routes`; adding it to a host app's federation
manifest and route table remains a separate step.
