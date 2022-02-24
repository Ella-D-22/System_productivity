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
import { AcPlaceholderLookupComponent } from './pages/SystemConfigurations/ChargesParams/event-id/ac-placeholder-lookup/ac-placeholder-lookup.component';
import { TransactionReportCodeLookupComponent } from './pages/SystemConfigurations/ChargesParams/event-id/transaction-report-code-lookup/transaction-report-code-lookup.component';
import { RateCodeLookupComponent } from './pages/SystemConfigurations/ChargesParams/event-id/rate-code-lookup/rate-code-lookup.component';
import { PartTransBusinessLookupComponent } from './pages/SystemConfigurations/ChargesParams/event-id/part-trans-business-lookup/part-trans-business-lookup.component';
import { LinkedEventIdLookupComponent } from './pages/SystemConfigurations/ChargesParams/event-id/linked-event-id-lookup/linked-event-id-lookup.component';
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
import { HlvsmComponent } from './pages/SystemConfigurations/InterestParams/hlvsm/hlvsm.component';
import { HlvsmMaintenanceComponent } from './pages/SystemConfigurations/InterestParams/hlvsm/hlvsm-maintenance/hlvsm-maintenance.component';
import { HlvsmLookUpComponent } from './pages/SystemConfigurations/InterestParams/hlvsm/hlvsm-look-up/hlvsm-look-up.component';
import { HtvsmComponent } from './pages/SystemConfigurations/InterestParams/htvsm/htvsm.component';
import { HitcmComponent } from './pages/SystemConfigurations/InterestParams/hitcm/hitcm.component';
import { HitcmMaintenanceComponent } from './pages/SystemConfigurations/InterestParams/hitcm/hitcm-maintenance/hitcm-maintenance.component';
import { HitcmLookUpComponent } from './pages/SystemConfigurations/InterestParams/hitcm/hitcm-look-up/hitcm-look-up.component';
import { HivsmComponent } from './pages/SystemConfigurations/InterestParams/hivsm/hivsm.component';
import { HivsmMaintenanceComponent } from './pages/SystemConfigurations/InterestParams/hivsm/hivsm-maintenance/hivsm-maintenance.component';
import { HivsmLookUpComponent } from './pages/SystemConfigurations/InterestParams/hivsm/hivsm-look-up/hivsm-look-up.component';
import { HtvsmMaintenanceComponent } from './pages/SystemConfigurations/InterestParams/htvsm/htvsm-maintenance/htvsm-maintenance.component';
import { HtvsmLookUpComponent } from './pages/SystemConfigurations/InterestParams/htvsm/htvsm-look-up/htvsm-look-up.component';
import { HbivsmComponent } from './pages/SystemConfigurations/InterestParams/hbivsm/hbivsm.component';
import { HbivsmLookUpComponent } from './pages/SystemConfigurations/InterestParams/hbivsm/hbivsm-look-up/hbivsm-look-up.component';
import { HbivsmMaintenanceComponent } from './pages/SystemConfigurations/InterestParams/hbivsm/hbivsm-maintenance/hbivsm-maintenance.component';
import { TermDepositComponent } from './pages/ProductModule/term-deposit/term-deposit.component';
import { TermDepositMaintenanceComponent } from './pages/ProductModule/term-deposit/term-deposit-maintenance/term-deposit-maintenance.component';
import { TermDepositLookupComponent } from './pages/ProductModule/term-deposit/term-deposit-lookup/term-deposit-lookup.component';
import { OfficeAccountsComponent } from './pages/ProductModule/Accounts/office-accounts/office-accounts.component';
import { AccountPlaceholdersComponent } from './pages/ProductModule/Accounts/account-placeholders/account-placeholders.component';
import { OfficeAccountsLookupComponent } from './pages/ProductModule/Accounts/office-accounts/office-accounts-lookup/office-accounts-lookup.component';
import { OfficeAccountsMaintenanceComponent } from './pages/ProductModule/Accounts/office-accounts/office-accounts-maintenance/office-accounts-maintenance.component';
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
import { AccountModuleComponent } from './pages/account-module/account-module.component';
import { AccountMaintenanceComponent } from './pages/account-module/account-maintenance/account-maintenance.component';
import { AccountLookupComponent } from './pages/account-module/account-lookup/account-lookup.component';
import { CollateralComponent } from './pages/collateral/collateral.component';
import { CollateralMaintenanceComponent } from './pages/collateral/collateral-maintenance/collateral-maintenance.component';
import { CollateralLookupComponent } from './pages/collateral/collateral-lookup/collateral-lookup.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { BranchesLookupComponent } from './pages/branches/branches-lookup/branches-lookup.component';
import { BranchesMaintenanceComponent } from './pages/branches/branches-maintenance/branches-maintenance.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    HeaderComponent,
    MenuOptionBarComponent,
    FooterComponent,
    SidebarComponent,
    EventIdComponent,
    DashboardComponent,
    AcPlaceholderLookupComponent,
    TransactionReportCodeLookupComponent,
    RateCodeLookupComponent,
    PartTransBusinessLookupComponent,
    LinkedEventIdLookupComponent,
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
    HlvsmComponent,
    HlvsmMaintenanceComponent,
    HlvsmLookUpComponent,
    HtvsmComponent,
    HitcmComponent,
    HitcmMaintenanceComponent,
    HitcmLookUpComponent,
    HivsmComponent,
    HivsmMaintenanceComponent,
    HivsmLookUpComponent,
    HtvsmMaintenanceComponent,
    HtvsmLookUpComponent,
    HbivsmComponent,
    HbivsmLookUpComponent,
    HbivsmMaintenanceComponent,
    TermDepositComponent,
    TermDepositMaintenanceComponent,
    TermDepositLookupComponent,
    OfficeAccountsComponent,
    AccountPlaceholdersComponent,
    OfficeAccountsLookupComponent,
    OfficeAccountsMaintenanceComponent,
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
    AccountModuleComponent,
    AccountMaintenanceComponent,
    AccountLookupComponent,
    CollateralComponent,
    CollateralMaintenanceComponent,
    CollateralLookupComponent,
    BranchesComponent,
    BranchesLookupComponent,
    BranchesMaintenanceComponent,
    
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
