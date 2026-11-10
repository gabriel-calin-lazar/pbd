import { initFederation } from '@angular-architects/native-federation';
import { environment } from './environments/environment';

initFederation(environment.federationManifestPath, {
  hostRemoteEntry: { url: './remoteEntry.json' },
  sse: true,
})
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
