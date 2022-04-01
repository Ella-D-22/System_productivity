// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    userAPI: 'http://localhost:9091',
    accountAPI: 'http://localhost:9091/account-service',
    productAPI: 'http://localhost:9091/product-service',
    collateralAPI: 'http://localhost:9091/collateral-service',
    systemAPI: 'http://localhost:9091/system-service',
    branchAPI: 'http://localhost:9091/branch-service',
    transactionAPI: 'http://localhost:9091/transaction-service',
    transactionexecutorAPI:'http://localhost:9091/transaction-executor-service',
    alertAPI: 'http://localhost:9091/alert-service',
    chargeAPI: 'http://localhost:9091/charge-service',
    customerAPI:'http://localhost:9091/customer-service',
    eodAPI:'http://localhost:9091/eod-service',
    groupAPI: 'http://localhost:9091/group-service',
    interestCalculatorAPI: 'http://localhost:9091/interest-calculator-service',
    menutreeAPI: 'http://localhost:9091/menutree-service',
    reportAPI:'http://localhost:9091/report-service' 

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
