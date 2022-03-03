import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/@core/helpers/auth.guard';
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
import { CollateralMaintenanceComponent } from './pages/collateral/collateral-maintenance/collateral-maintenance.component';
import { CollateralComponent } from './pages/collateral/collateral.component';
import { BranchesMaintenanceComponent } from './pages/branches/branches-maintenance/branches-maintenance.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { CashTransactionsComponent } from './pages/transactions/transactions/cash-transactions/cash-transactions.component';
import { TransactionMaintainanceComponent } from './pages/transactions/transactions/transaction-maintainance/transaction-maintainance.component';
import { LoanAccountComponent } from './pages/loan-account/loan-account.component';
import { LoanAccountMaintainanceComponent } from './pages/loan-account/loan-account-maintainance/loan-account-maintainance.component';

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
    },
    {
      path: 'configurations/global/linked/organization/data/view',
      component:LinkedOrganizationComponent,
    },
    {
      path: 'configurations/global/currency/maintenance',
      component:CurrencyMaintenanceComponent,
    },
    {
      path: 'configurations/global/currency/data/view',
      component:CurrencyConfigComponent,
    },
    // Scheme Type
    {
      path: 'configurations/global/scheme-type/maintenance',
      component:SchemeTypeMaintenanceComponent,
    },
    {
      path: 'configurations/global/scheme-type/data/view',
      component:SchemeTypeComponent
    },

    // Exceptions Controller
    

    {
      path: 'configurations/global/exceptions-codes/maintenance',
      component:ExceptionsCodesMaintenanceComponent,
    },
    
    {
      path: 'configurations/global/exceptions-codes/data/view',
      component:ExceptionsCodesComponent 
    },


    // GL Code Maintenance
    {
      path: 'configurations/global/gl-code/maintenance',
      component:GlCodeMaintenanceComponent ,
    },
    {
      path: 'configurations/global/gl-code/data/view',
      component:GlCodeComponent 
    },
    // GL subhead code Maintenance
    {
      path: 'configurations/global/gl-subhead/maintenance',
      component:GlSubheadMaintenanceComponent
    },
    {
      path: 'configurations/global/gl-subhead/data/view',
      component:GlSubheadComponent
    },

    // Charge Preferentials
    {
      path: 'configurations/charge/preferentials/maintenance',
      component:ChrgPreferentialMaintenanceComponent,
    },
    {
      path: 'configurations/charge/preferentials/data/view',
      component:ChrgPreferentialComponent,
    },
// Charge Prioritization
    {
      path: 'configurations/charge/prioritization/maintenance',
      component:ChrgPrioritizationMaintenanceComponent,
    },
    {
      path: 'configurations/charge/prioritization/data/view',
      component:ChrgPrioritizationComponent,
    },

    // Event Type
    {
      path: 'configurations/charge/event-type/maintenance',
      component:EventTypeMaintenanceComponent,
    },
    {
      path: 'configurations/charge/event-type/data/view',
      component:EventTypeComponent,
    },
// event id
    {
      path: 'configurations/charge/event-id/maintenance',
      component:EventIdMaintenanceComponent,
    },
    {
      path: 'configurations/charge/event-id/data/view',
      component:EventIdComponent,
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
      },
      {
        path: 'configurations/product/loan-product/data/view',
        component:LoanproductComponent,
      },

      {
        path: 'configurations/product/term-deposit/maintenance',
        component:TermDepositMaintenanceComponent,
      },
      {
        path: 'configurations/product/term-deposit/data/view',
        component:TermDepositComponent,
      },

      // Saving Scheme
      {
        path: 'configurations/product/saving-scheme/maintenance',
        component:SavingschemeMaintenanceComponent,
      },
      {
        path: 'configurations/product/saving-scheme/data/view',
        component:SavingsSchemeComponent,
      },
      
      // Current Scheme
      {
        path: 'configurations/product/current-scheme/maintenance',
        component: CurrentSchemeMaintenanceComponent ,
      },
      {
        path: 'configurations/product/current-scheme/data/view',
        component: CurrentSchemeComponent ,
      },
      
      // Overdraft Scheme

      {
        path: 'configurations/product/overdraft-scheme/maintenance',
        component:OverdraftSchemeMaintenanceComponent,
      },
      {
        path: 'configurations/product/overdraft-scheme/data/view',
        component:OverdraftsSchemeComponent,
      },


     
            // *******************************************************************************************\
      //                                         Accounts Settings
      // *******************************************************************************************

      // Loan Product
      {
        path: 'account/maintenance',
        component:LoanAccountMaintainanceComponent,
      },
      {
        path: 'accounts/data/view',
        component:LoanAccountComponent,
      },
      // collateral
      {
        path: 'collateral/maintenance',
        component:CollateralMaintenanceComponent,
      },
      {
        path: 'collateral/data/view',
        component:CollateralComponent,
      },
      // Braches
      

      {
        path: 'branches/maintenance',
        component:BranchesMaintenanceComponent,
      },
      {
        path: 'branches/data/view',
        component:BranchesComponent,
      },
      
      {
        path: 'transactions/maintenance',
        component:TransactionMaintainanceComponent,
      },
      {
        path: 'transactions/cash/data/view',
        component:CashTransactionsComponent,
      },
      


      
    
      


    
      

   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
