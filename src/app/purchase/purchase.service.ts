import { Injectable } from '@angular/core';
import { Purchase } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PurchaseService {

  private purchaseUrl = environment.appUrl + 'api/Purchases';

  constructor(private http: HttpClient) { }

  getPurchases(userId: number): Promise<Purchase[]> {
    const url = `${this.purchaseUrl}/${userId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Purchase[])
       .catch(this.handleError)
      ;
  }

  submitPurchases(purchases: Purchase[]): Promise<boolean> {
    const url = `${this.purchaseUrl}`;
    return this.http.post(url, purchases)
      .toPromise()
      .then(response => response as boolean)
      .catch(this.handleError)
      ;
  }

  private handleError(error: any): Promise<any> {
    throw new Error(error.message);
  }
}

