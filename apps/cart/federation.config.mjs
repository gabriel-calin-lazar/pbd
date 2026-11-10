import {
  withNativeFederation,
  fromPackageJson,
} from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'cart',
  exposes: {
    './Routes': './apps/cart/src/app/features/cart/cart.routes.ts',
  },
  externals: ['@pbd/auth', '@pbd/cart-store', 'pbd/tokens'],
  sharedMappings: [
    [['@pbd/auth'], { includeSecondaries: true }],
    [['@pbd/cart-store'], { includeSecondaries: true }],
    [['@pbd/tokens'], { includeSecondaries: true }],
  ],
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
