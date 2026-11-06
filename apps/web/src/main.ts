import { initFederation } from '@angular-architects/native-federation';

initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
  sse: true,
})
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
