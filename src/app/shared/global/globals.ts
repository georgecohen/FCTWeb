import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  saveSuccessMessage = 'Save Successfully.';
  deleteSuccessMessage = 'Delete Successfully.';

  saveErrorMessage = 'There is an error when saving.';
  deleteErrorMessage = 'There is an error when deleting.';

    getId(field: string): number {
        return +localStorage.getItem(field);
    }

    setId(field: string, id: number): void {
        localStorage.setItem(field, id.toString());
    }

    getName(field: string): string {
        return localStorage.getItem(field);
    }

    setName(field: string, name:string): void {
        localStorage.setItem(field, name);
    }

    getProductId(): number {
        return this.getId('ProductId');
    }

    setProductId(id: number): void {
        this.setId('ProductId', id);
    }

    getProductName(): string {
        return this.getName('ProductName');
    }

    setProductName(name: string): void {
        this.setName('ProductName', name);
    }
    resetProduct(): void {
        this.setProductId(0);
        this.setProductName('');
    }

}
