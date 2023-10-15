import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
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

  alertActive = false;

  constructor(
    private api: ProductService,
    private router: Router
  ) { }

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
    
    
    this.api.addProduct(newProduct).subscribe(() =>{

      this.alertActive = true;
      setTimeout(() => {
        this.alertActive = false
        this.router.navigate(['']);
      }, 2500);

    });
    

    this.name = '';
    this.description = '';
    this.price = undefined;
    this.imgUrl = '';
    
  }
}
