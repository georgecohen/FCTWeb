
import {switchMap} from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product, MyResponse } from '../models';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Globals, AlertService } from '../shared/shared';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-product',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    submitting = false;
    showMsg = false;
    menuItems: any[];

    products: Product[];
    parentId: number;
    parentName: string;
    from: string;

    displayedColumns = ['select', 'id', 'name', 'price', 'description', 'delete'];

    dataSource: MatTableDataSource<Product>;
    selection = new SelectionModel<Product>(false, []);

    selectedProductId: number;
    selectedProduct: Product;

    @ViewChild('pnProduct', {static: true}) paginator: MatPaginator;
    @ViewChild('tblProduct', {static: true}) sort: MatSort;

    // ngAfterViewInit() {
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    // }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService,
        private globals: Globals,
        private alertService: AlertService,
        public snackBar: MatSnackBar
    ) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts(): void {
      this.productsService.getProducts().then(products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        // this.ngAfterViewInit();

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
        if (this.selection.selected && this.selection.selected.length > 0) {
            this.selectedProductId = this.selection.selected[0].id;
            this.selectedProduct = Object.assign({}, product);
        } else {
            this.selectedProductId = 0;
            this.selectedProduct = null;
        }
    }

    addProduct(): void {
        this.selection.clear();
        this.selectedProduct = null;

        let timeout = 10;

        if (this.selectedProductId > 0) {
            timeout = 400;
            this.selectedProductId = -1;
        }

        setTimeout(() => {
            this.selectedProduct = {
                id: -1,
                name: '',
                price: null,
                description: null
            } as Product;
        }, timeout);
    }

    onSaveProduct(): void {
        this.submitting = true;

        if (this.selectedProduct) {
          this.doSaveProduct();
        }
    }

    doSaveProduct(): void {
      if (this.selectedProduct.id > 0) {
        this.productsService.SaveProduct(this.selectedProduct.id, this.selectedProduct)
          .then(response => {
            // save success, re-get
            this.getProducts();
            this.openSnackBar(this.globals.saveSuccessMessage, true);
            this.submitting = false;
          })
          .catch((error) => {
            this.submitting = false;
            console.log("There is an error when saving product (" + this.selectedProduct.name + "): " + error.message);
            this.openSnackBar(this.globals.saveErrorMessage, false);
          });
      } else {
        this.productsService.CreateProduct(this.selectedProduct)
          .then(newProduct => {
            if (newProduct != null) {
              // save success, re-get
              this.getProducts();

              if (this.selectedProduct.id <= 0) {
                this.selectedProduct.id = newProduct.id;
                this.selectedProductId = newProduct.id;
                this.onSelect(this.selectedProduct);
              }

              this.openSnackBar(this.globals.saveSuccessMessage, true);
            }
            this.submitting = false;
          })
          .catch((error) => {
            this.submitting = false;
            console.log("There is an error when saving product (" + this.selectedProduct.name + "): " + error.message);
            this.openSnackBar(this.globals.saveErrorMessage, false);
          });
      }

    }

    onDelete(id: number): void {

        // this.productsService
        //     .DeleteProduct(id)
        //     .then((response: MyResponse) => {
        //         if (response.success) {
        //             //delete success, re-get
        //             this.getProducts();
        //             this.openSnackBar(this.globals.deleteSuccessMessage, true);
        //
        //             if (this.selectedProductId == id) {
        //                 this.selectedProductId = 0;
        //                 this.selectedProduct = null;
        //
        //                 this.globals.setCategoryId(0);
        //                 this.globals.setCategoryName('');
        //             }
        //         } else {
        //             ////server error
        //             this.openSnackBar(response.message, false);
        //         }
        //     })
        //     .catch((error) => {
        //         this.submitting = false;
        //         console.log("There is an error when deleting product (#" + id + "): " + error.message);
        //         this.openSnackBar(this.globals.deleteErrorMessage, false);
        //     });

    }

    openSnackBar(message: string, success: boolean) {
        if (success) {
          this.snackBar.open(message, null, {duration: 3000, panelClass: (success ? 'snack-bar-green' : 'snack-bar-red')});
        } else {
          this.snackBar.open(message, "Close", {panelClass: (success ? 'snack-bar-green' : 'snack-bar-red')});
        }
    }
}
