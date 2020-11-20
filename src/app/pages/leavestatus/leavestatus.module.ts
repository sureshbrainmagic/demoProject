import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LeavestatusPageRoutingModule } from './leavestatus-routing.module';
import { LeavestatusPage } from './leavestatus.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgSelectModule,
    LeavestatusPageRoutingModule
  ],
  declarations: [LeavestatusPage]
})
export class LeavestatusPageModule {}
