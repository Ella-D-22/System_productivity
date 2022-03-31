// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  userAPI: 'http://localhost:9091',
  // systemAPI: 'http://localhost:9091/system-service',
  // accountsAPI: 'http://localhost:9091/account-service',
  // collateralAPI:'http://localhost:9091/collateral-service',
  // productAPI:'http://localhost:9091/product-service',
  branchsAPI:'http://localhost:9091/branch-service',
  transactionAPI:'http://localhost:9091/transaction-service',
  
  // sacco_api:'http://localhost:9105',
//   user-service:
//   url: http://localhost:9091
// account-service:
//   url: http://localhost:9099
// product-service:
//   url: http://localhost:9100
// collateral-service:
//   url: http://localhost:9103
// system-service:
//   url: http://localhost:9093
// branch-service:
//   url: http://localhost:8000
// transaction-service:
//   url: http://localhost:9105

collateralAPI:'http://localhost:9103',
accountsAPI: 'http://localhost:9099',
productAPI: 'http://localhost:9100',
systemAPI: 'http://localhost:9093',

customerAPI: 'http://localhost:9097',

glsAPI: 'http://localhost:9910'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
