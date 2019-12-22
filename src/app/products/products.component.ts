
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Customer, Product, Purchase} from '../models';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from './products.service';
import { PurchaseService } from '../purchase/purchase.service';
import * as _ from 'underscore';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-product',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  submitting = false;
  showMsg = false;
  currentUser: Customer;
  products: Product[];
  purchases: Purchase[] = [];
  allPurchases: Purchase[] = [];

  displayedColumns = ['select', 'id', 'name', 'price', 'description'];

  dataSource: MatTableDataSource<Product>;
  selection = new SelectionModel<Product>(true, []);

  @ViewChild('pnProduct', {static: true}) paginator: MatPaginator;
  @ViewChild('tblProduct', {static: true}) sort: MatSort;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productsService: ProductsService,
      public snackBar: MatSnackBar,
      private purchaseService: PurchaseService,
      private authenticationService: LoginService
  ) {
      this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().then(products => {
      this.products = products;
      this.dataSource = new MatTableDataSource(this.products);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      const filter = document.getElementById('searchFilter') as HTMLInputElement;
      this.applyFilter(filter.value);
    });
  }

  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  onSelect(product: Product): void {
    this.selection.toggle(product);
  }

  purchaseProduct() {
    if (this.selection.selected && this.selection.selected.length > 0) {
      this.selection.selected.forEach(p => {
        const exist = _.find(this.purchases, (itm) => {
          return p.id === itm.productId;
        });

        if (exist) {
          exist.quantity += 1;
        } else {
          this.purchases.push(
            {id: 0, productId: p.id, userId: this.currentUser.id, quantity: 1, price: p.price, product: p, user: null, dateCreated: null}
          );
        }
      });
    }
  }

  submitPurchase() {
    if (this.purchases && this.purchases.length > 0) {
      this.purchaseService.submitPurchases(this.purchases).then(() => this.router.navigate(['purchase']));
    }
  }

  quantityChange(newQuantity: any, item: any) {
    if (newQuantity.value !== item.quantity) {
      this.purchases.forEach(p => {
        if (p.productId === item.productId) {
          p.quantity = newQuantity;
        }
      });
    }
  }

  getTotalQuantity(): number {
    return this.purchases.reduce((acc, current) => acc + (+current.quantity), 0);
  }

  getTotalPrice() {
    return this.purchases.reduce((acc, current) => acc + (+current.quantity * current.product.price), 0);
  }

  deletePurchase(purchase: Purchase) {
    this.purchases = _.reject(this.purchases, (p) => p.productId === purchase.productId);
  }

  cancelAll() {
    this.purchases = [];
  }

  openSnackBar(message: string, success: boolean) {
      if (success) {
        this.snackBar.open(message, null, {duration: 3000, panelClass: (success ? 'snack-bar-green' : 'snack-bar-red')});
      } else {
        this.snackBar.open(message, 'Close', {panelClass: (success ? 'snack-bar-green' : 'snack-bar-red')});
      }
  }
}
