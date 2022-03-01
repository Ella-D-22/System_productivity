// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  apiUrl: 'http://localhost:9191',
  systemAPI: 'http://localhost:9093',
  accountsAPI: 'http://localhost:9099',
  collateralAPI:'http://localhost:9103',
  productAPI:'http://localhost:9100',
  branchsAPI:'http://localhost:8000'



  // accountsAPI: 'http://localhost:9191'
  // branchsAPI:'http://localhost:8000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
