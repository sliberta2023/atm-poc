import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RestockComponent } from './components/restock/restock.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview'
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'withdraw',
    component: WithdrawComponent
  },
  {
    path: 'restock',
    component: RestockComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
