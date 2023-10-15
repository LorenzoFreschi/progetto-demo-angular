import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:5000/products';

  constructor(
    private http: HttpClient
  ) { }

  public getAllProducts$() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // public deleteItem(id) {
    
  // }

  public getProductById$(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }
  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.delete<Product>(url);
  }
  addProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product, httpOptions);
  }
  updateProduct(product: Product) : Observable<Product>{
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(url, product, httpOptions);
  }
}
