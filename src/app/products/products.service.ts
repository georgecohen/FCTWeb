import { Injectable } from '@angular/core';
import { Product } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductsService {

  private productUrl = environment.appUrl + 'api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Promise<Product[]> {
    const url = `${this.productUrl}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError)
     ;
  }

  private handleError(error: any): Promise<any> {
    throw new Error(error.message);
  }
}

