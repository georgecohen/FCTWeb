import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product, Purchase } from '../models';
// import { AdminService } from '../../_admin-services/admin.service';
import { MatPaginator, MatSort, MatTableDataSource, fadeInContent, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Globals, AlertService } from '../shared/shared';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

    submitting: boolean = false;
    showMsg: boolean = false;
    productSelecting: boolean = false;
    isDirty: boolean = false;

    menuItems: any[];

    purchases: Purchase[];
    products: Product[];
    selectedProduct: Product;

    displayedColumns = ['select', 'id', 'product_id', 'name', 'quantity', 'total_price', 'unit_price', 'purchase_date', 'delete'];

    dataSource: MatTableDataSource<Purchase>;
    selection = new SelectionModel<Purchase>(false, []);

    selectedPurchase: Purchase;

    @ViewChild('pnCategory', {static: true}) paginator: MatPaginator;
    @ViewChild('tblCategory', {static: true}) sort: MatSort;

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        // private adminService: AdminService,
        public snackBar: MatSnackBar,
        public globals: Globals,
        public dialog: MatDialog
    ) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit() {
        this.GetPurchases();
    }

    GetPurchases(): void {

        // this.adminService.GetPurchases().then(purchases => {
        //     this.purchases = purchases;
        //     this.dataSource = new MatTableDataSource(this.purchases);
        //     this.ngAfterViewInit();
        //
        //     var filter = document.getElementById('searchFilter') as HTMLInputElement;
        //     this.applyFilter(filter.value);
        //
        //     if (this.selectedPurchase && this.selectedPurchase.id > 0) {
        //         this.selection.select(this.purchases.find(c => c.id == this.selectedPurchase.id));
        //     }
        // });

    }

    getProducts(): void {

        // this.adminService.getAllProducts().then(products => {
        //     this.products = products;
        // });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    onSelect(purchase: Purchase): void {
        this.selection.toggle(purchase);
        if (this.selection.selected && this.selection.selected.length > 0) {
            this.selectedPurchase = Object.assign({}, purchase);
            setTimeout(() => { this.scrollToName("detailheader"); }, 100);
        } else {
            this.selectedPurchase = null;
        }
    }

    scrollToName(id: string): void {
        let el = document.getElementById(id);
        el.scrollIntoView({ behavior: 'smooth' });
    }

    productSelected(product: Product): void {

        // if (this.selectedPurchase.product_id != product.id) {
        //     this.isDirty = true;
        //     this.productSelecting = false;
        //
        //     this.selectedPurchase.product_id = product.id;
        //     this.selectedPurchase.name = product.name;
        //     this.selectedPurchase.icon = product.icon;
        // }
    }

    cancel(): void {
        this.selectedPurchase = null;
        this.selection.clear();
        this.productSelecting = false;
        this.isDirty = false;
    }

    onSavePurchase(): void {
        this.submitting = true;

        // this.adminService.SavePurchase(this.selectedPurchase)
        //     .then(purchaseId => {
        //         if (purchaseId > 0) {
        //             this.isDirty = false;
        //
        //             this.GetPurchases();
        //             this.openSnackBar(this.globals.saveSuccessMessage, true);
        //             this.selectedPurchase = null;
        //         }
        //         this.submitting = false;
        //
        //     })
        //     .catch((error) => {
        //         this.submitting = false;
        //         console.log("There is an error when saving purchase (" + this.selectedPurchase.name + "): " + error.message);
        //         this.openSnackBar(this.globals.saveErrorMessage, false);
        //     });
    }

    selectProduct(): void {
        this.getProducts();
        this.productSelecting = true;
    }


    addPurchase(): void {
        this.selection.clear();
        // this.selectedPurchase = <Purchase>{};
    }

    cancelPurchase(): void {
        this.selectedPurchase = null;
        this.isDirty = false;
        this.productSelecting = false;
    }

    onDelete(id: number): void {
        // this.adminService.DeletePurchase(id)
        //     .then(response => {
        //         if (response) {
        //             //delete success, re-get
        //             this.GetPurchases();
        //             if (this.selectedPurchase && this.selectedPurchase.id == id) {
        //                 this.selectedPurchase = null;
        //                 this.productSelecting = false;
        //             }
        //
        //             this.openSnackBar(this.globals.deleteSuccessMessage, true);
        //         }
        //     })
        //     .catch((error) => {
        //         this.submitting = false;
        //         console.log("There is an error when deleting purchase (#" + id + "): " + error.message);
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

