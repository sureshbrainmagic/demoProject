import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover/popover.component';


@NgModule({
  declarations: [
    PopoverComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports: [
    PopoverComponent
  ]
})
export class ComponentsModule { }
