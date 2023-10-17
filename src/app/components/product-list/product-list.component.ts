import { Component } from '@angular/core';
import { Observable, filter, Subscription } from 'rxjs';
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
  numeroProdotti : number = 0;
  numeroProdottiSubscription: Subscription;
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
    this.numeroProdottiSubscription = this.api
      .onNumberOfProductChange()
      .subscribe((value) => (this.numeroProdotti = value))
  }


  public ngOnInit(): void {
    this.products$ = this.api.getAllProducts$();
  }
  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.numeroProdottiSubscription.unsubscribe();
  }

  deleteProduct(product: Product) {
    const id = product.id;

    this.alertService.setMessage(this.alert.message);
    this.api.deleteProduct(product).subscribe(this.api.productObserver);
    this.alertService.setStatus(true);
    this.api.updateNumerOfProduct()
    setTimeout(() => {
      this.alertService.setStatus(false);
      this.alertService.resetAlert();
      //this.router.navigate(['']);
    }, 2000);

    this.products$ = this.products$.pipe(filter(products$ => products$.every(p => p.id != id)));

    
    
  }
}
