import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { AlertModule, ConfirmationPopoverModule } from './../shared/index';
// import { AdminService } from '../../_admin-services/admin.service';
//import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from './../shared/shared.module';


@NgModule({
    imports: [
        //CommonModule,
        PurchaseRoutingModule,
        //FormsModule,
        MaterialModule,
        AlertModule,
        SharedModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    declarations: [PurchaseComponent],
    // providers: [AdminService]
})
export class PurchaseModule {}
