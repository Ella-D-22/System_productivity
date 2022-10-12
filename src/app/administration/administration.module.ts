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
// import { LoanAccountComponent } from './pages/loan-account/loan-account.component';
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
import { LimitsComponent } from './pages/collateral-limits/limits/limits.component';
import { LimitsMaintenanceComponent } from './pages/collateral-limits/limits/limits-maintenance/limits-maintenance.component';
import { LimitsLookupComponent } from './pages/collateral-limits/limits/limits-lookup/limits-lookup.component';
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
import { ExitMemberComponent } from './pages/group-lending-component/exit-member/exit-member.component';
import { AccountLookupComponent } from './pages/transaction-execution/account-lookup/account-lookup.component';
import { LoanAccountMaintenanceComponent } from './pages/Account-Component/loan-account/loan-account-maintenance/loan-account-maintenance.component';
import { SavingsAccountComponent } from './pages/Account-Component/savings-account/savings-account.component';
import { SavingsMaintenanceComponent } from './pages/Account-Component/savings-account/savings-maintenance/savings-maintenance.component';
import { SavingsLookupComponent } from './pages/Account-Component/savings-account/savings-lookup/savings-lookup.component';
import { OverdraftAccountComponent } from './pages/Account-Component/overdraft-account/overdraft-account.component';
import { OfficeAccountComponent } from './pages/Account-Component/office-account/office-account.component';
import { CurrentAccountComponent } from './pages/Account-Component/current-account/current-account.component';
import { TermDepositAccountComponent } from './pages/Account-Component/term-deposit-account/term-deposit-account.component';
import { TermDepositAccountMaintenanceComponent } from './pages/Account-Component/term-deposit-account/term-deposit-maintenance/term-deposit-maintenance.component';
import { CurrentAccountMaintenanceComponent } from './pages/Account-Component/current-account/current-account-maintenance/current-account-maintenance.component';
import { CurrentAccountLookupComponent } from './pages/Account-Component/current-account/current-account-lookup/current-account-lookup.component';
import { OfficeAccountMaintenanceComponent } from './pages/Account-Component/office-account/office-account-maintenance/office-account-maintenance.component';
import { OfficeAccountLookupComponent } from './pages/Account-Component/office-account/office-account-lookup/office-account-lookup.component';
import { OverdraftAccountMaintenanceComponent } from './pages/Account-Component/overdraft-account/overdraft-account-maintenance/overdraft-account-maintenance.component';
import { OverdraftAccountLookupComponent } from './pages/Account-Component/overdraft-account/overdraft-account-lookup/overdraft-account-lookup.component';
import { LoanAccountComponent } from './pages/Account-Component/loan-account/loan-account/loan-account.component';
import { TransferMemberComponent } from './pages/group-lending-component/transfer-member/transfer-member.component';
import { GroupLendingComponentComponent } from './pages/group-lending-component/group-lending-component.component';
import { GroupLendingLookupComponent } from './pages/group-lending-component/group-lending-lookup/group-lending-lookup.component';
import { GroupLendingMaintenanceComponent } from './pages/group-lending-component/group-lending-maintenance/group-lending-maintenance.component';
import { WidgetMembershipComponent } from './pages/dashboard/widget-membership/widget-membership.component';
import { WidgetLendingComponent } from './pages/dashboard/widget-lending/widget-lending.component';
import { WidgetChargesComponent } from './pages/dashboard/widget-charges/widget-charges.component';
import { WidgetShareCapitalComponent } from './pages/dashboard/widget-share-capital/widget-share-capital.component';
import { LoanRepaymentComponent } from './pages/reports/view-report/loan-repayment/loan-repayment.component';
import { AccountStatementComponent } from './pages/reports/view-report/account-statement/account-statement.component';
import { LOanStatementComponent } from './pages/reports/view-report/loan-statement/loan-statement.component';
import { OfficeAccountsComponent } from './pages/reports/view-report/office-accounts/office-accounts.component';
import { ARREARSGENERALSTATEMENTComponent } from './pages/reports/view-report/arrearsgeneralstatement/arrearsgeneralstatement.component';
import { ASSETSCLASSIFICATIONSComponent } from './pages/reports/view-report/assetsclassifications/assetsclassifications.component';
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
    // LoanAccountComponent,
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
    LimitsComponent,
    LimitsMaintenanceComponent,
    LimitsLookupComponent,
    // Customers
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
    MainClassificationsComponent,
    MainClassificationLookupComponent,
    MainClassificationMaintenanceComponent,
    SubClassificationsComponent,
    SubClassificationLookupComponent,
    SubClassificationMaintenanceComponent,
    TransferMemberComponent,
    ExitMemberComponent,
    AccountLookupComponent,
    LoanAccountComponent,
    LoanAccountMaintenanceComponent,
    SavingsAccountComponent,
    SavingsMaintenanceComponent,
    SavingsLookupComponent,
    OverdraftAccountComponent,
    OfficeAccountComponent,
    CurrentAccountComponent,
    TermDepositAccountComponent,
    TermDepositAccountMaintenanceComponent,
    CurrentAccountMaintenanceComponent,
    CurrentAccountLookupComponent,
    OfficeAccountMaintenanceComponent,
    OfficeAccountLookupComponent,
    OverdraftAccountMaintenanceComponent,
    OverdraftAccountLookupComponent,
    GroupLendingComponentComponent,
    GroupLendingLookupComponent,
    GroupLendingMaintenanceComponent,
    WidgetMembershipComponent,
    WidgetLendingComponent,
    WidgetChargesComponent,
    WidgetShareCapitalComponent,
    LoanRepaymentComponent,
    AccountStatementComponent,
    LOanStatementComponent,
    OfficeAccountsComponent,
    ARREARSGENERALSTATEMENTComponent,
    ASSETSCLASSIFICATIONSComponent
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
