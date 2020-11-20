import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeavestatusPage } from './leavestatus.page';

const routes: Routes = [
  {
    path: '',
    component: LeavestatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavestatusPageRoutingModule {}
