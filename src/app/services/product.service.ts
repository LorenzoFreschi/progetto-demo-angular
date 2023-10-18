import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { BehaviorSubject, Observable, Subject, Subscription, filter } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$!: Observable<Product[]>;
  numeroProdottiSubject$ = new Subject<number>();
  productObserver = {
    next: function(value:Product){
    },
    error: (err:any) => {
      console.log(err);
      this.alertService.setError("Si è verificato un errore, riprova più tardi");
    }
  }
  private apiUrl = 'http://localhost:5000/products';
  
  
  constructor(
    private http: HttpClient,
    private alertService : AlertService
  ) {}

  public getAllProducts$() : Observable<Product[]> {
    this.products$ = this.http.get<Product[]>(this.apiUrl);
    this.updateNumerOfProduct();
    return this.products$;
  }

  public getProductObserver() {
    return this.productObserver;
  }

  public getProductById$(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }
  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`;
    const p =  this.http.delete<Product>(url);
    this.updateNumerOfProduct();
    return p;
  }
  addProduct(product: Product) : Observable<Product>{
    const p = this.http.post<Product>(this.apiUrl, product, httpOptions);
    this.updateNumerOfProduct();
    return p;
  }
  updateProduct(product: Product) : Observable<Product>{
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(url, product, httpOptions);
  }
  updateNumerOfProduct(): void{
    this.products$.subscribe(p => this.numeroProdottiSubject$.next(p.length))
  }
  onNumberOfProductChange(): Observable<any>{
    return this.numeroProdottiSubject$.asObservable();
  }
  
}
