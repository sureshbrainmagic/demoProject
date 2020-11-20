import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LeaverequestPageRoutingModule } from './leaverequest-routing.module';
import { LeaverequestPage } from './leaverequest.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LeaverequestPageRoutingModule
  ],
  declarations: [LeaverequestPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' }
  ]
})
export class LeaverequestPageModule {}
