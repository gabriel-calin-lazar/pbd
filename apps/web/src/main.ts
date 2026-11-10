import { initFederation } from '@angular-architects/native-federation';

// TODO make this path configurable via environment entry
// development - staging - production
// port based - stage location based - prod location based
initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
  sse: true,
})
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
