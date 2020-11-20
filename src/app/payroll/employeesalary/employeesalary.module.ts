import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeesalaryPageRoutingModule } from './employeesalary-routing.module';

import { EmployeesalaryPage } from './employeesalary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeesalaryPageRoutingModule
  ],
  declarations: [EmployeesalaryPage]
})
export class EmployeesalaryPageModule {}
