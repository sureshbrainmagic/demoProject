import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayslipPageRoutingModule } from './payslip-routing.module';
import { PayslipPage } from './payslip.page';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgSelectModule,
    PayslipPageRoutingModule
  ],
  declarations: [PayslipPage]
})
export class PayslipPageModule {}
