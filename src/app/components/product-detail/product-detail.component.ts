import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/interfaces/Alert';
import { Product } from 'src/app/interfaces/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: Product;
  alert : Alert = {active: false, error:false, message: "Prodotto aggiornato correttamente"}
  alertSubscription: Subscription;
  edit: boolean = true;

  constructor(
    private api: ProductService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.alertSubscription = this.alertService
      .onAlert()
      .subscribe((value) => (this.alert = value));
  }
  
  public ngOnInit(): void {

    this.route.params.subscribe(params => {
      
      /*  è più probabile che il componente che mostra il dettaglio di un prodotto 
       venga riutilizzato all'interno dell'applicazione,
       quindi il prodotto viene richiamato dall'api e non passato dal componente padre */
      this.api.getProductById$(params['id']).subscribe((product) => {
        this.product = product
      });
    });
  }

  updateProduct(){
    
    this.alertService.setMessage(this.alert.message);
    this.api.updateProduct(this.product).subscribe(this.api.productObserver);
    this.alertService.setStatus(true);
    setTimeout(() => {
      this.alertService.setStatus(false);
      //this.router.navigate(['']);
    }, 2000);
    
  }
}
