import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { authInterceptorProviders } from 'src/@core/helpers/auth.interceptor';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { EventIdComponent } from './pages/SystemConfigurations/ChargesParams/event-id/event-id.component';
import { EventIdMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/event-id/event-id-maintenance/event-id-maintenance.component';
import { MenuOptionBarComponent } from './layouts/menu-option-bar/menu-option-bar.component';
import { CurrencyConfigComponent } from './pages/SystemConfigurations/GlobalParams/currency-config/currency-config.component';
import { LinkedOrganizationComponent } from './pages/SystemConfigurations/GlobalParams/linked-organization/linked-organization.component';
import { LinkedOrganizationMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/linked-organization/linked-organization-maintenance/linked-organization-maintenance.component';
import { LinkedOrganizationLookupComponent } from './pages/SystemConfigurations/GlobalParams/linked-organization/linked-organization-lookup/linked-organization-lookup.component';
import { CurrencyMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/currency-config/currency-maintenance/currency-maintenance.component';
import { CurrencyLookupComponent } from './pages/SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { EventTypeComponent } from './pages/SystemConfigurations/ChargesParams/event-type/event-type.component';
import { EventTypeMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/event-type/event-type-maintenance/event-type-maintenance.component';
import { EventTypeLookupComponent } from './pages/SystemConfigurations/ChargesParams/event-type/event-type-lookup/event-type-lookup.component';
import { ChrgPreferentialComponent } from './pages/SystemConfigurations/ChargesParams/chrg-preferential/chrg-preferential.component';
import { ChrgPreferentialMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/chrg-preferential/chrg-preferential-maintenance/chrg-preferential-maintenance.component';
import { ChrgPreferentialLookupComponent } from './pages/SystemConfigurations/ChargesParams/chrg-preferential/chrg-preferential-lookup/chrg-preferential-lookup.component';
import { TermDepositComponent } from './pages/ProductModule/term-deposit/term-deposit.component';
import { TermDepositMaintenanceComponent } from './pages/ProductModule/term-deposit/term-deposit-maintenance/term-deposit-maintenance.component';
import { TermDepositLookupComponent } from './pages/ProductModule/term-deposit/term-deposit-lookup/term-deposit-lookup.component';
import { LoanproductComponent } from './pages/ProductModule/loanproduct/loanproduct.component';
import { LoanproductMaintenanceComponent } from './pages/ProductModule/loanproduct/loanproduct-maintenance/loanproduct-maintenance.component';
import { LoanproductLookupComponent } from './pages/ProductModule/loanproduct/loanproduct-lookup/loanproduct-lookup.component';
import { ChrgPrioritizationComponent } from './pages/SystemConfigurations/ChargesParams/chrg-prioritization/chrg-prioritization.component';
import { ChrgPrioritizationLookupComponent } from './pages/SystemConfigurations/ChargesParams/chrg-prioritization/chrg-prioritization-lookup/chrg-prioritization-lookup.component';
import { ChrgPrioritizationMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/chrg-prioritization/chrg-prioritization-maintenance/chrg-prioritization-maintenance.component';
import { SchemeTypeComponent } from './pages/SystemConfigurations/GlobalParams/scheme-type/scheme-type.component';
import { SchemeTypeLookupComponent } from './pages/SystemConfigurations/GlobalParams/scheme-type/scheme-type-lookup/scheme-type-lookup.component';
import { SchemeTypeMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/scheme-type/scheme-type-maintenance/scheme-type-maintenance.component';
import { GlCodeComponent } from './pages/SystemConfigurations/GlobalParams/gl-code/gl-code.component';
import { GlCodeLookupComponent } from './pages/SystemConfigurations/GlobalParams/gl-code/gl-code-lookup/gl-code-lookup.component';
import { GlCodeMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/gl-code/gl-code-maintenance/gl-code-maintenance.component';
import { GlSubheadComponent } from './pages/SystemConfigurations/GlobalParams/gl-subhead/gl-subhead.component';
import { GlSubheadLookupComponent } from './pages/SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';
import { GlSubheadMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-maintenance/gl-subhead-maintenance.component';
import { LoanFeeComponent } from './pages/ProductModule/loanproduct/sub-components/loan-fee/loan-fee.component';
import { SavingsSchemeComponent } from './pages/ProductModule/savings-scheme/savings-scheme.component';
import { CurrentSchemeComponent } from './pages/ProductModule/current-scheme/current-scheme.component';
import { OverdraftsSchemeComponent } from './pages/ProductModule/overdrafts-scheme/overdrafts-scheme.component';
import { SavingschemeMaintenanceComponent } from './pages/ProductModule/savings-scheme/savingscheme-maintenance/savingscheme-maintenance.component';
import { SavingschemeLookupComponent } from './pages/ProductModule/savings-scheme/savingscheme-lookup/savingscheme-lookup.component';
import { OverdraftSchemeLookupComponent } from './pages/ProductModule/overdrafts-scheme/overdraft-scheme-lookup/overdraft-scheme-lookup.component';
import { OverdraftSchemeMaintenanceComponent } from './pages/ProductModule/overdrafts-scheme/overdraft-scheme-maintenance/overdraft-scheme-maintenance.component';
import { CurrentSchemeLookupComponent } from './pages/ProductModule/current-scheme/current-scheme-lookup/current-scheme-lookup.component';
import { CurrentSchemeMaintenanceComponent } from './pages/ProductModule/current-scheme/current-scheme-maintenance/current-scheme-maintenance.component';
import { ExceptionsCodesComponent } from './pages/SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes.component';
import { ExceptionsCodesMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes-maintenance/exceptions-codes-maintenance.component';
import { ExceptionsCodesLookupComponent } from './pages/SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes-lookup/exceptions-codes-lookup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CollateralComponent } from './pages/collateral-limits/collateral/collateral.component';
import { CollateralMaintenanceComponent } from './pages/collateral-limits/collateral/collateral-maintenance/collateral-maintenance.component';
import { CollateralLookupComponent } from './pages/collateral-limits/collateral/collateral-lookup/collateral-lookup.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { BranchesLookupComponent } from './pages/branches/branches-lookup/branches-lookup.component';
import { BranchesMaintenanceComponent } from './pages/branches/branches-maintenance/branches-maintenance.component';
import { CashTransactionsComponent } from './pages/transactions/transactions/cash-transactions/cash-transactions.component';
import { TransactionMaintainanceComponent } from './pages/transactions/transactions/transaction-maintainance/transaction-maintainance.component';
import { AccountComponent } from './pages/transactions/lookup/account/account.component';
import { LoanAccountComponent } from './pages/loan-account/loan-account.component';
import { LoanAccountMaintainanceComponent } from './pages/loan-account/loan-account-maintainance/loan-account-maintainance.component';
import { LoanAccountLookupComponent } from './pages/loan-account/loan-account-lookup/loan-account-lookup.component';
import { BranchComponent } from './pages/loan-account/lookup/branch/branch.component';
import { CustomerComponent } from './pages/loan-account/lookup/customer/customer.component';
import { GlSubheadLookup2Component } from './pages/loan-account/lookup/gl-subhead/gl-subhead.component';
import { ProductComponent } from './pages/loan-account/lookup/product/product.component';
import { UserComponent } from './pages/loan-account/lookup/user/user.component';
import { EventIdLookupComponent } from './pages/SystemConfigurations/ChargesParams/event-id/event-id-lookup/event-id-lookup.component';
import { InterestComponent } from './pages/interest/interest.component';
import { InterestMaintainanceComponent } from './pages/interest/interest-maintainance/interest-maintainance.component';
import { InterestLookupComponent } from './pages/interest/interest-lookup/interest-lookup.component';
import { MisSectorMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/mis-sector/mis-sector-maintenance/mis-sector-maintenance.component';
import { MisSectorLookupComponent } from './pages/SystemConfigurations/GlobalParams/mis-sector/mis-sector-lookup/mis-sector-lookup.component';
import { MisSectorComponent } from './pages/SystemConfigurations/GlobalParams/mis-sector/mis-sector.component';
import { MisSubSectorComponent } from './pages/SystemConfigurations/GlobalParams/mis-sub-sector/mis-sub-sector.component';
import { MisSubSectorMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/mis-sub-sector/mis-sub-sector-maintenance/mis-sub-sector-maintenance.component';
import { MisSubSectorLookupComponent } from './pages/SystemConfigurations/GlobalParams/mis-sub-sector/mis-sub-sector-lookup/mis-sub-sector-lookup.component';
import { GuarantosComponent } from './pages/SystemConfigurations/GlobalParams/guarantos/guarantos.component';
import { GuarantosMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/guarantos/guarantos-maintenance/guarantos-maintenance.component';
import { LimitsComponent } from './pages/collateral-limits/limits/limits.component';
import { LimitsMaintenanceComponent } from './pages/collateral-limits/limits/limits-maintenance/limits-maintenance.component';
import { LimitsLookupComponent } from './pages/collateral-limits/limits/limits-lookup/limits-lookup.component';
import { MainGroupComponent } from './pages/GLS/main-group/main-group.component';
import { MainGroupMaintenanceComponent } from './pages/GLS/main-group/main-group-maintenance/main-group-maintenance.component';
import { SubGroupMaintenanceComponent } from './pages/GLS/sub-group/sub-group-maintenance/sub-group-maintenance.component';
import { SubGroupComponent } from './pages/GLS/sub-group/sub-group.component';
import { SubGroupLookupComponent } from './pages/GLS/sub-group/sub-group-lookup/sub-group-lookup.component';
import { MainGroupLookupComponent } from './pages/GLS/main-group/main-group-lookup/main-group-lookup.component';
import { RetailCustomerComponent } from './pages/CustomersComponent/retail-customer/retail-customer.component';
import { RetailCustomerLookupComponent } from './pages/CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { RetailCustomerMaintenanceComponent } from './pages/CustomersComponent/retail-customer/retail-customer-maintenance/retail-customer-maintenance.component';
import { CorporateCustomerComponent } from './pages/CustomersComponent/corporate-customer/corporate-customer.component';
import { CorporateCustomerLookupComponent } from './pages/CustomersComponent/corporate-customer/corporate-customer-lookup/corporate-customer-lookup.component';
import { CorporateCustomerMaintenanceComponent } from './pages/CustomersComponent/corporate-customer/corporate-customer-maintenance/corporate-customer-maintenance.component';
import { TransactionExecutionLookupComponent } from './pages/transaction-execution/transaction-execution-lookup/transaction-execution-lookup.component';
import { TransactionExecutionMainComponent } from './pages/transaction-execution/transaction-execution-main/transaction-execution-main.component';
import { TransactionExecutionComponent } from './pages/transaction-execution/transaction-execution.component';
import { ShareCapitalParamsComponent } from './pages/SystemConfigurations/GlobalParams/share-capital-params/share-capital-params.component';
import { ShareCapitalComponent } from './pages/share-capital/share-capital.component';
import { ShareCapitalMaintenanceComponent } from './pages/share-capital/share-capital-maintenance/share-capital-maintenance.component';
import { CountriesLookupComponent } from './pages/SystemConfigurations/GlobalParams/currency-config/countries-lookup/countries-lookup.component';
import { ShareCapitalParamsMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/share-capital-params/share-capital-params-maintenance/share-capital-params-maintenance.component';
import { ShareCapitalParamsLookupComponent } from './pages/SystemConfigurations/GlobalParams/share-capital-params/share-capital-params-lookup/share-capital-params-lookup.component';
import { GuarantorsParamsComponent } from './pages/SystemConfigurations/GlobalParams/guarantors-params/guarantors-params.component';
import { GuarantorsParamsMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/guarantors-params/guarantors-params-maintenance/guarantors-params-maintenance.component';
import { GuarantorsParamsLookupComponent } from './pages/SystemConfigurations/GlobalParams/guarantors-params/guarantors-params-lookup/guarantors-params-lookup.component';
import { ShareCapitalInstallmentsComponent } from './pages/share-capital/share-capital-installments/share-capital-installments.component';
import { SegmentsComponent } from './pages/SystemConfigurations/GlobalParams/segments/segments.component';
import { SegmentLookupComponent } from './pages/SystemConfigurations/GlobalParams/segments/segment-lookup/segment-lookup.component';
import { SegmentMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/segments/segment-maintenance/segment-maintenance.component';
import { SubSegmentLookupComponent } from './pages/SystemConfigurations/GlobalParams/sub-segment/sub-segment-lookup/sub-segment-lookup.component';
import { SubSegmentMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/sub-segment/sub-segment-maintenance/sub-segment-maintenance.component';
import { SubSegmentComponent } from './pages/SystemConfigurations/GlobalParams/sub-segment/sub-segment/sub-segment.component';
import { ReportMaintainanceComponent } from './pages/reports/report-maintainance/report-maintainance.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SpecificReportComponent } from './pages/reports/specific-report/specific-report.component';
import { ViewReportComponent } from './pages/reports/view-report/view-report.component';
import { AccountsModuleComponent } from './pages/accounts-module/accounts-module.component';
import { AccountsMaintenanceComponent } from './pages/accounts-module/accounts-maintenance/accounts-maintenance.component';
import { AccountsLookupComponent } from './pages/accounts-module/accounts-lookup/accounts-lookup.component';
import { MainClassificationsComponent } from './pages/SystemConfigurations/GlobalParams/main-classifications/main-classifications.component';
import { MainClassificationLookupComponent } from './pages/SystemConfigurations/GlobalParams/main-classifications/main-classification-lookup/main-classification-lookup.component';
import { MainClassificationMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/main-classifications/main-classification-maintenance/main-classification-maintenance.component';
import { SubClassificationsComponent } from './pages/SystemConfigurations/GlobalParams/sub-classifications/sub-classifications.component';
import { SubClassificationLookupComponent } from './pages/SystemConfigurations/GlobalParams/sub-classifications/sub-classification-lookup/sub-classification-lookup.component';
import { SubClassificationMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/sub-classifications/sub-classification-maintenance/sub-classification-maintenance.component';
@NgModule({
  declarations: [
    AdministrationComponent,
    HeaderComponent,
    MenuOptionBarComponent,
    FooterComponent,
    SidebarComponent,
    EventIdComponent,
    DashboardComponent,
    EventIdMaintenanceComponent,
    CurrencyConfigComponent,
    LinkedOrganizationComponent,
    LinkedOrganizationMaintenanceComponent,
    LinkedOrganizationLookupComponent,
    CurrencyMaintenanceComponent,
    CurrencyLookupComponent,
    EventTypeComponent,
    EventTypeMaintenanceComponent,
    EventTypeLookupComponent,
    ChrgPreferentialComponent,
    ChrgPreferentialMaintenanceComponent,
    ChrgPreferentialLookupComponent,
    TermDepositComponent,
    TermDepositMaintenanceComponent,
    TermDepositLookupComponent,
    LoanproductComponent,
    LoanproductMaintenanceComponent,
    LoanproductLookupComponent,
    ChrgPrioritizationComponent,
    ChrgPrioritizationLookupComponent,
    ChrgPrioritizationMaintenanceComponent,
    SchemeTypeComponent,
    SchemeTypeLookupComponent,
    SchemeTypeMaintenanceComponent,
    GlCodeComponent,
    GlCodeLookupComponent,
    GlCodeMaintenanceComponent,
    GlSubheadComponent,
    GlSubheadLookupComponent,
    GlSubheadMaintenanceComponent,
    LoanFeeComponent,
    SavingsSchemeComponent,
    CurrentSchemeComponent,
    OverdraftsSchemeComponent,
    SavingschemeMaintenanceComponent,
    SavingschemeLookupComponent,
    OverdraftSchemeLookupComponent,
    OverdraftSchemeMaintenanceComponent,
    CurrentSchemeLookupComponent,
    CurrentSchemeMaintenanceComponent,
    ExceptionsCodesComponent,
    ExceptionsCodesMaintenanceComponent,
    ExceptionsCodesLookupComponent,
    CollateralComponent,
    CollateralMaintenanceComponent,
    CollateralLookupComponent,
    BranchesComponent,
    BranchesLookupComponent,
    BranchesMaintenanceComponent,
    CashTransactionsComponent,
    TransactionMaintainanceComponent,
    AccountComponent,
    LoanAccountComponent,
    LoanAccountMaintainanceComponent,
    LoanAccountLookupComponent,
    BranchComponent,
    CustomerComponent,
    GlSubheadLookup2Component,
    ProductComponent,
    UserComponent,
    EventIdLookupComponent,
    InterestComponent,
    InterestMaintainanceComponent,
    InterestLookupComponent,
    //MIS-Codes
    MisSectorComponent,
    MisSectorLookupComponent,
    MisSectorMaintenanceComponent,
    MisSubSectorComponent,
    MisSubSectorMaintenanceComponent,
    MisSubSectorLookupComponent,
    GuarantosComponent,
    GuarantosMaintenanceComponent,
    LimitsComponent,
    LimitsMaintenanceComponent,
    LimitsLookupComponent,
    // Customers
    MainGroupComponent,
    MainGroupMaintenanceComponent,
    SubGroupMaintenanceComponent,
    SubGroupComponent,
    SubGroupLookupComponent,
    MainGroupLookupComponent,
    RetailCustomerComponent,
    RetailCustomerLookupComponent,
    RetailCustomerMaintenanceComponent,
    CorporateCustomerComponent,
    CorporateCustomerLookupComponent,
    CorporateCustomerMaintenanceComponent,
    TransactionExecutionComponent,
    TransactionExecutionLookupComponent,
    TransactionExecutionMainComponent,

    ShareCapitalParamsComponent,
    ShareCapitalComponent,
    ShareCapitalMaintenanceComponent,

    CountriesLookupComponent,
     ShareCapitalParamsMaintenanceComponent,
     ShareCapitalParamsLookupComponent,
     GuarantorsParamsComponent,
     GuarantorsParamsMaintenanceComponent,
     GuarantorsParamsLookupComponent,
     ShareCapitalInstallmentsComponent,
     SegmentsComponent,
     SegmentLookupComponent,
     SegmentMaintenanceComponent,
     SubSegmentLookupComponent,
     SubSegmentMaintenanceComponent,
     SubSegmentComponent,
 

    ReportsComponent,
    ReportMaintainanceComponent,
    ViewReportComponent,
    SpecificReportComponent,
    AccountsModuleComponent,
    AccountsMaintenanceComponent,
    AccountsLookupComponent,
    AccountsLookupComponent,
    MainClassificationsComponent,
    MainClassificationLookupComponent,
    MainClassificationMaintenanceComponent,
    SubClassificationsComponent,
    SubClassificationLookupComponent,
    SubClassificationMaintenanceComponent

  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    DataTablesModule,
    RouterModule,
    HighchartsChartModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenuOptionBarComponent
  ],
  providers: [authInterceptorProviders, EventIdMaintenanceComponent],
})
export class AdministrationModule { }
