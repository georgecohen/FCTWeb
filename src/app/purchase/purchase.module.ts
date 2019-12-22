import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { ConfirmationPopoverModule } from './../shared/index';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { PurchaseService } from './purchase.service';


@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
    MaterialModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  declarations: [
    PurchaseComponent],
  providers: [PurchaseService]
})
export class PurchaseModule {}
