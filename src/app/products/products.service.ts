import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      .catch(this.handleError);
  }

  getProductById(id: number): Promise<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  CreateProduct(product: Product): Promise<Product> {
    const url = `${this.productUrl}`;
    return this.http.post(url, product)
        .toPromise()
        .then(response => response as Product)
        .catch(this.handleError);
  }

  SaveProduct(id: number, product: Product): Promise<null> {
    const url = `${this.productUrl}/${id}`;
    return this.http.put(url, product)
        .toPromise()
        .then()
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    throw new Error(error.message);
  }
}

