import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesalaryPage } from './employeesalary.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeesalaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesalaryPageRoutingModule {}
