import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/interfaces/Alert';
import { Product } from 'src/app/interfaces/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  name?:string;
  description?:string;
  price?:number;
  imgUrl?: string

  alert : Alert = {active: false, error:false, message: 'Prodotto aggiunto correttamente! Stai per essere rediretto sulla pagina principale'}
  alertSubscription: Subscription;

  constructor(
    private api: ProductService,
    private router: Router,
    private alertService : AlertService,
  ) {
    this.alertSubscription = this.alertService
      .onAlert()
      .subscribe((value) => (this.alert = value));
  }

  addProduct(){
    
    if (!this.name) {
      alert('Il nome del prodotto è obbligatorio!');
      return;
    }
    if (!this.price) {
      alert('Il prezzo del prodotto è obbligatorio!');
      return;
    }

    const newProduct: Product = {
      name: this.name,
      description: this.description,
      price: this.price,
      imgUrl: this.imgUrl
    };
    
    this.alertService.setMessage(this.alert.message);
    this.api.addProduct(newProduct).subscribe(this.api.productObserver);
    this.alertService.setStatus(true);
    setTimeout(() => {
      this.alertService.setStatus(false);
      this.alertService.resetAlert();
      this.router.navigate(['']);
    }, 2000);
    
    

    this.name = '';
    this.description = '';
    this.price = undefined;
    this.imgUrl = '';
    
  }
}
