import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanActivateModuleGuard } from 'src/@core/helpers/CanActivateModule.guard';
import { Role } from 'src/@core/Models/role/role.model';
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CurrencyConfigComponent } from './pages/SystemConfigurations/GlobalParams/currency-config/currency-config.component';
import { EventIdMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/event-id/event-id-maintenance/event-id-maintenance.component';
import { EventIdComponent } from './pages/SystemConfigurations/ChargesParams/event-id/event-id.component';
import { LinkedOrganizationMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/linked-organization/linked-organization-maintenance/linked-organization-maintenance.component';
import { LinkedOrganizationComponent } from './pages/SystemConfigurations/GlobalParams/linked-organization/linked-organization.component';
import { CurrencyMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/currency-config/currency-maintenance/currency-maintenance.component';
import { EventTypeMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/event-type/event-type-maintenance/event-type-maintenance.component';
import { EventTypeComponent } from './pages/SystemConfigurations/ChargesParams/event-type/event-type.component';
import { ChrgPreferentialMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/chrg-preferential/chrg-preferential-maintenance/chrg-preferential-maintenance.component';
import { ChrgPreferentialComponent } from './pages/SystemConfigurations/ChargesParams/chrg-preferential/chrg-preferential.component';
import { TermDepositMaintenanceComponent } from './pages/ProductModule/term-deposit/term-deposit-maintenance/term-deposit-maintenance.component';
import { TermDepositComponent } from './pages/ProductModule/term-deposit/term-deposit.component';
import { LoanproductMaintenanceComponent } from './pages/ProductModule/loanproduct/loanproduct-maintenance/loanproduct-maintenance.component';
import { LoanproductComponent } from './pages/ProductModule/loanproduct/loanproduct.component';
import { ChrgPrioritizationComponent } from './pages/SystemConfigurations/ChargesParams/chrg-prioritization/chrg-prioritization.component';
import { ChrgPrioritizationMaintenanceComponent } from './pages/SystemConfigurations/ChargesParams/chrg-prioritization/chrg-prioritization-maintenance/chrg-prioritization-maintenance.component';
import { SchemeTypeMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/scheme-type/scheme-type-maintenance/scheme-type-maintenance.component';
import { SchemeTypeComponent } from './pages/SystemConfigurations/GlobalParams/scheme-type/scheme-type.component';
import { GlCodeMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/gl-code/gl-code-maintenance/gl-code-maintenance.component';
import { GlCodeComponent } from './pages/SystemConfigurations/GlobalParams/gl-code/gl-code.component';
import { GlSubheadMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-maintenance/gl-subhead-maintenance.component';
import { GlSubheadComponent } from './pages/SystemConfigurations/GlobalParams/gl-subhead/gl-subhead.component';
import { SavingschemeMaintenanceComponent } from './pages/ProductModule/savings-scheme/savingscheme-maintenance/savingscheme-maintenance.component';
import { SavingsSchemeComponent } from './pages/ProductModule/savings-scheme/savings-scheme.component';
import { OverdraftSchemeMaintenanceComponent } from './pages/ProductModule/overdrafts-scheme/overdraft-scheme-maintenance/overdraft-scheme-maintenance.component';
import { OverdraftsSchemeComponent } from './pages/ProductModule/overdrafts-scheme/overdrafts-scheme.component';
import { CurrentSchemeMaintenanceComponent } from './pages/ProductModule/current-scheme/current-scheme-maintenance/current-scheme-maintenance.component';
import { CurrentSchemeComponent } from './pages/ProductModule/current-scheme/current-scheme.component';
import { ExceptionsCodesComponent } from './pages/SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes.component';
import { ExceptionsCodesMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes-maintenance/exceptions-codes-maintenance.component';
import { BranchesMaintenanceComponent } from './pages/branches/branches-maintenance/branches-maintenance.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { CashTransactionsComponent } from './pages/transactions/transactions/cash-transactions/cash-transactions.component';
import { TransactionMaintainanceComponent } from './pages/transactions/transactions/transaction-maintainance/transaction-maintainance.component';
import { LoanAccountComponent } from './pages/loan-account/loan-account.component';
import { LoanAccountMaintainanceComponent } from './pages/loan-account/loan-account-maintainance/loan-account-maintainance.component';
import { InterestMaintainanceComponent } from './pages/interest/interest-maintainance/interest-maintainance.component';
import { InterestComponent } from './pages/interest/interest.component';
import { MisSectorComponent } from './pages/SystemConfigurations/GlobalParams/mis-sector/mis-sector.component';
import { MisSectorMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/mis-sector/mis-sector-maintenance/mis-sector-maintenance.component';
import { MisSubSectorComponent } from './pages/SystemConfigurations/GlobalParams/mis-sub-sector/mis-sub-sector.component';
import { MisSubSectorMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/mis-sub-sector/mis-sub-sector-maintenance/mis-sub-sector-maintenance.component';
import { GuarantosComponent } from './pages/SystemConfigurations/GlobalParams/guarantos/guarantos.component';


import { CollateralComponent } from './pages/collateral-limits/collateral/collateral.component';
import { CollateralMaintenanceComponent } from './pages/collateral-limits/collateral/collateral-maintenance/collateral-maintenance.component';
import { LimitsComponent } from './pages/collateral-limits/limits/limits.component';
import { LimitsMaintenanceComponent } from './pages/collateral-limits/limits/limits-maintenance/limits-maintenance.component';
import { MainGroupComponent } from './pages/GLS/main-group/main-group.component';
import { MainGroupMaintenanceComponent } from './pages/GLS/main-group/main-group-maintenance/main-group-maintenance.component';
import { SubGroupComponent } from './pages/GLS/sub-group/sub-group.component';
import { SubGroupMaintenanceComponent } from './pages/GLS/sub-group/sub-group-maintenance/sub-group-maintenance.component';
import { RetailCustomerComponent } from './pages/CustomersComponent/retail-customer/retail-customer.component';
import { RetailCustomerMaintenanceComponent } from './pages/CustomersComponent/retail-customer/retail-customer-maintenance/retail-customer-maintenance.component';
import { CorporateCustomerMaintenanceComponent } from './pages/CustomersComponent/corporate-customer/corporate-customer-maintenance/corporate-customer-maintenance.component';
import { CorporateCustomerComponent } from './pages/CustomersComponent/corporate-customer/corporate-customer.component';
import { TransactionExecutionComponent } from './pages/transaction-execution/transaction-execution.component';
import { TransactionExecutionMainComponent } from './pages/transaction-execution/transaction-execution-main/transaction-execution-main.component';
import { ShareCapitalParamsComponent } from './pages/SystemConfigurations/GlobalParams/share-capital-params/share-capital-params.component';
import { ShareCapitalComponent } from './pages/share-capital/share-capital.component';
import { ShareCapitalMaintenanceComponent } from './pages/share-capital/share-capital-maintenance/share-capital-maintenance.component';
import { ShareCapitalParamsMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/share-capital-params/share-capital-params-maintenance/share-capital-params-maintenance.component';
import { GuarantorsParamsMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/guarantors-params/guarantors-params-maintenance/guarantors-params-maintenance.component';
import { GuarantorsParamsComponent } from './pages/SystemConfigurations/GlobalParams/guarantors-params/guarantors-params.component';
import { SegmentMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/segments/segment-maintenance/segment-maintenance.component';
import { SegmentsComponent } from './pages/SystemConfigurations/GlobalParams/segments/segments.component';
import { SubSegmentMaintenanceComponent } from './pages/SystemConfigurations/GlobalParams/sub-segment/sub-segment-maintenance/sub-segment-maintenance.component';
import { SubSegmentComponent } from './pages/SystemConfigurations/GlobalParams/sub-segment/sub-segment/sub-segment.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SpecificReportComponent } from './pages/reports/specific-report/specific-report.component';
import { ViewReportComponent } from './pages/reports/view-report/view-report.component';
const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'configurations/global/linked/organization/maintenance',
      component:LinkedOrganizationMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/global/linked/organization/data/view',
      component:LinkedOrganizationComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/global/currency/maintenance',
      component:CurrencyMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/global/currency/data/view',
      component:CurrencyConfigComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    // Scheme Type
    {
      path: 'configurations/global/scheme-type/maintenance',
      component:SchemeTypeMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/global/scheme-type/data/view',
      component:SchemeTypeComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },

    // Exceptions Controller
    {
      path: 'configurations/global/exceptions-codes/maintenance',
      component:ExceptionsCodesMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    
    {
      path: 'configurations/global/exceptions-codes/data/view',
      component:ExceptionsCodesComponent ,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },

    //MIS Codes Maintenance
    {
      path:'configurations/global/mis-sector/maintenance',
      component:MisSectorMaintenanceComponent,
      // canActivate:[CanActivateModuleGuard],
      data:{preload:true},
    },

    {
      
      path:'configurations/global/mis-sector/data/view',
      component:MisSectorComponent,
      // canActivate:[CanActivateModuleGuard],
      data:{preload:true},
    },

    //Mis Sub Sector
    {
      path:'configurations/global/mis-sub-sector/maintenance',
      component:MisSubSectorMaintenanceComponent,
      // canActivate:[CanActivateModuleGuard],
      data:{preload:true},
    },

    //Guarantors Config
    {
       path:'configurations/global/guarantors/maintenance',
       component:GuarantorsParamsMaintenanceComponent,
      //  canActivate:[CanActivateModuleGuard],
       data:{preload:true},
    },

    {
      path:'configurations/global/guarantors/data/view',
      component:GuarantorsParamsComponent,
     //  canActivate:[CanActivateModuleGuard],
      data:{preload:true},
   },
    
    {
      path:'configurations/global/mis-sub-sector/data/view',
      component:MisSubSectorComponent,
      // canActivate:[CanActivateModuleGuard],
      data:{preload:true},

    },




    // GL Code Maintenance
    {
      path: 'configurations/global/gl-code/maintenance',
      component:GlCodeMaintenanceComponent,
      // canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/global/gl-code/data/view',
      component:GlCodeComponent,
      // canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    // GL subhead code Maintenance
    {
      path: 'configurations/global/gl-subhead/maintenance',
      component:GlSubheadMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/global/gl-subhead/data/view',
      component:GlSubheadComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },

    // Charge Preferentials
    {
      path: 'configurations/charge/preferentials/maintenance',
      component:ChrgPreferentialMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/charge/preferentials/data/view',
      component:ChrgPreferentialComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
// Charge Prioritization
    {
      path: 'configurations/charge/prioritization/maintenance',
      component:ChrgPrioritizationMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/charge/prioritization/data/view',
      component:ChrgPrioritizationComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },

    // Event Type
    {
      path: 'configurations/charge/event-type/maintenance',
      component:EventTypeMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/charge/event-type/data/view',
      component:EventTypeComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
// event id
    {
      path: 'configurations/charge/event-id/maintenance',
      component:EventIdMaintenanceComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    {
      path: 'configurations/charge/event-id/data/view',
      component:EventIdComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },

    // {
    //   path: 'configurations/interest/event/type/maintenance',
    //   component:EventTypeMaintenanceComponent,
    // },
    // {
    //   path: 'configurations/interest/event/type/maintenance/:function_type/:eventtype_id',
    // //   component:EventTypeComponent
    // },

    {
      path: 'event_id_module/currency',
      component:CurrencyConfigComponent,
      canActivate: [CanActivateModuleGuard],
      data: {preload:true },
    },
    // ******************* Interests Setup ****************************************************
    

    // Interest Version Code


       // *******************************************************************************************\
      //                                        Accounts Settings
      // *******************************************************************************************
   


      // *******************************************************************************************\
      //                                         Product Settings
      // *******************************************************************************************

      // Loan Product
      {
        path: 'configurations/product/loan-product/maintenance',
        component:LoanproductMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'configurations/product/loan-product/data/view',
        component:LoanproductComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },

      {
        path: 'configurations/product/term-deposit/maintenance',
        component:TermDepositMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'configurations/product/term-deposit/data/view',
        component:TermDepositComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },

      // Saving Scheme
      {
        path: 'configurations/product/saving-scheme/maintenance',
        component:SavingschemeMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'configurations/product/saving-scheme/data/view',
        component:SavingsSchemeComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      
      // Current Scheme
      {
        path: 'configurations/product/current-scheme/maintenance',
        component: CurrentSchemeMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'configurations/product/current-scheme/data/view',
        component: CurrentSchemeComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      
      // Overdraft Scheme

      {
        path: 'configurations/product/overdraft-scheme/maintenance',
        component:OverdraftSchemeMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'configurations/product/overdraft-scheme/data/view',
        component:OverdraftsSchemeComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
     
     // *******************************************************************************************\
      //                                         Accounts Settings
      // *******************************************************************************************

      // Loan Product
      {
        path: 'account/maintenance',
        component:LoanAccountMaintainanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'accounts/data/view',
        component:LoanAccountComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      // collateral
      {
        path: 'configurations/collateral-limits/Collateral/maintenance',
        component:CollateralMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },

      //limits
      {
        path: 'configurations/collateral-limits/Limits/maintenance',
        component:LimitsMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true},
      },
      {
        path: 'configurations/collateral-limits/Limits/data/view',
        component:LimitsComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true},
      },
      {
        path: 'configurations/collateral-limits/Collateral/data/view',
        component:CollateralComponent,
        // canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      // Braches
      

      {
        path: 'branches/maintenance',
        component:BranchesMaintenanceComponent,
        canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'branches/data/view',
        component:BranchesComponent,
        canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      
      {
        path: 'transactions/maintenance',
        component:TransactionExecutionComponent,
        canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'transactions/cash/data/view',
        component:TransactionExecutionMainComponent,
        canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },

       
      // *******************************************************************************************\
      //                                         Interest Settings
      // *******************************************************************************************
      {
        path: 'interest/maintenance',
        component:InterestMaintainanceComponent,
        canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },
      {
        path: 'interest/data/view',
        component:InterestComponent,
        canActivate: [CanActivateModuleGuard],
        data: {preload:true },
      },


      // *******************************************************************************************\
      //                                         Customers Management
      // *******************************************************************************************

      // 
      // 
      {
        path: 'customer/retail/maintenance',
        component:RetailCustomerMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true },
      },
      {
        path: 'customer/retail/data/view',
        component:RetailCustomerComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true },
      },

     
      //  Cooporate Customer 
      // {
      //   path: 'customers/maintenance',
      //   component: MainKycComponent,
      //   // canActivate: [CanActivateModuleGuard],
      //   // data: {preload:true },
     
      {
         path: 'customers/corporate/maintenance',
         component:CorporateCustomerMaintenanceComponent,
        //  canActivate: [CanActivateModuleGuard],
        //  data:{ preload:true},
      },
      {
        path:'customers/corporate/data/view',
        component:CorporateCustomerComponent,
        // canActivate:[CanActivateModuleGuard],
        // data:{preload:true},
      },

      
      // *******************************************************************************************\
      //                                         GLS Management
      // *******************************************************************************************
      {
        path:'GLS/main-group/maintenance',
        component:MainGroupMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },
      {
        path:'GLS/main-group/data/view',
        component:MainGroupComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },

      {
        path:'GLS/sub-group/maintenance',
        component:SubGroupMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },
      {
        path:'GLS/sub-group/data/view',
        component:SubGroupComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },

      // Share capital Configurations
      {
        path: 'configurations/global/share-capital/params/maintenance',
        component:ShareCapitalParamsMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },
            // Share capital Configurations
      {
        path: 'configurations/global/share-capital/params',
        component:ShareCapitalParamsComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },
      
      {
        path: 'share-capital/data/view',
        component:ShareCapitalComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},

      },
      {
        path: 'share-capital/maintenance',
        component:ShareCapitalMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },

      //Segments
      {
        path: 'configurations/global/segment/maintenance',
        component:SegmentMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},

      },
      {
        path: 'configurations/global/segment/data/view',
        component:SegmentsComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},

      },
      {
        path: 'configurations/global/sub-segment/maintenance',
        component:SubSegmentMaintenanceComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},

      },
      {
        path: 'configurations/global/sub-segment/data/view',
        component:SubSegmentComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},

      },
    //  Reports
      {
        path: 'add-report', 
        component: ReportsComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },
      {
        path: 'view-report', 
        component: ViewReportComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },
      {
        path: 'specific-report', 
        component: SpecificReportComponent,
        // canActivate: [CanActivateModuleGuard],
        // data: {preload:true},
      },


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
