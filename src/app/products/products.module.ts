import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AlertModule, ConfirmationPopoverModule } from './../shared/index';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ProductsService } from './products.service';


@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        FormsModule,
        MaterialModule,
        AlertModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    declarations: [ProductsComponent],
    providers: [ProductsService]
})
export class ProductsModule {}
