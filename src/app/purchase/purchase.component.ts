import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Customer, Purchase} from '../models';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PurchaseService } from './purchase.service';
import { LoginService } from '../login/login.service';


@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
    purchases: Purchase[];

    displayedColumns = [ 'id', 'product.name', 'price', 'quantity', 'total', 'dateCreated'];

    dataSource: MatTableDataSource<Purchase>;
    currentUser: Customer;

    @ViewChild('pnPurchase', {static: true}) paginator: MatPaginator;
    @ViewChild('tblPurchase', {static: true}) sort: MatSort;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private purchaseService: PurchaseService,
        private authenticationService: LoginService
    ) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit() {
      this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
        this.GetPurchases(x.id);
      });
    }

    GetPurchases(userId: number): void {
      this.purchaseService.getPurchases(userId).then(purchases => {
        this.purchases = purchases;
        this.dataSource = new MatTableDataSource(this.purchases);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

}

