import {
  withNativeFederation,
  fromPackageJson,
} from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'web',
  sharedMappings: [[['@pbd/core'], { includeSecondaries: true }]],
  shared: fromPackageJson({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    build: 'package',
  })
    .skip(['@angular/cdk/schematics'])
    .patch(['@angular/*'], { includeSecondaries: { keepAll: true } })
    .get(),
  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
  features: {
    denseChunking: true,
    denseExternals: true,
    strictImports: false,
  },
});
