import { Component } from '@angular/core';
import { Observable, filter, of, count, BehaviorSubject, Subscription } from 'rxjs';
import { Alert } from 'src/app/interfaces/Alert';
import { Product } from 'src/app/interfaces/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  numeroProdotti$ = new BehaviorSubject<number>(0);
  products$!: Observable<Product[]>;
  alert : Alert = {active: false, error:false, message: "Prodotto eliminato"}
  alertSubscription: Subscription; 
  loading:boolean = false;

  constructor(
    private api: ProductService,
    private alertService: AlertService
  ) {
    this.alertSubscription = this.alertService
      .onAlert()
      .subscribe((value) => (this.alert = value));
  }


  public ngOnInit(): void {
    
    this.products$ = this.api.getAllProducts$();
    this.products$.subscribe(p => this.numeroProdotti$.next(p.length));

  }

  deleteProduct(product: Product) {
    const id = product.id;

    this.alertService.setMessage(this.alert.message);
    this.api.deleteProduct(product).subscribe(this.api.productObserver);
    this.alertService.setStatus(true);
    setTimeout(() => {
      this.alertService.setStatus(false);
      this.alertService.resetAlert();
      //this.router.navigate(['']);
    }, 2000);

    this.products$ = this.products$.pipe(filter(products$ => products$.every(p => p.id != id)));

    
    
  }
}
