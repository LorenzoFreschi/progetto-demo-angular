import { Component } from '@angular/core';
import { Observable, filter, of, count, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  numeroProdotti$ = new BehaviorSubject<number>(0);
  products$!: Observable<Product[]>;
  alertActive:boolean = false;
  alertError:boolean = false;
  alertMessage:string = 'Prodotto eliminato'
  loading:boolean = false;

  constructor(
    private api: ProductService
  ) { }


  public ngOnInit(): void {
    
    this.products$ = this.api.getAllProducts$();
    this.products$.subscribe(p => this.numeroProdotti$.next(p.length));

  }

  deleteProduct(product: Product) {
    const id = product.id;
    this.api.deleteProduct(product).subscribe()
      
    this.products$ = this.products$.pipe(filter(products$ => products$.every(p => p.id != id)));
    this.products$.subscribe(
      (p) => this.numeroProdotti$.next(p.length),
      (err) => {
        this.alertError = true;
        this.alertMessage = "Si è verificato un errore, riprova più tardi"
      }
    );
    this.alertActive = true
    setTimeout(() => {
      this.alertActive = false;
    }, 2000);

    
    
  }
}
