import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: Product;
  alertActive:boolean = false;
  alertError:boolean = false;
  alertMessage:string = 'Prodotto aggionato correttamente!'

  constructor(
    private api: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  public ngOnInit(): void {

    this.route.params.subscribe(params => {
      
      this.api.getProductById$(params['id']).subscribe((product) => {
        this.product = product
      });
    });
  }

  updateProduct(){
      
    this.api.updateProduct(this.product).subscribe(
      (p) => console.log(p),
      (err) => {
        this.alertError = true;
        this.alertMessage = "Si è verificato un errore, riprova più tardi"
      }
    );
    this.alertActive = true
    setTimeout(() => {
      this.alertActive = false;
      //this.router.navigate(['']);
    }, 2000);
    
  }
}
