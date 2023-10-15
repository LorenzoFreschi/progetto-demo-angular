import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];
  alertActive = false;
  constructor(
    private api: ProductService
  ) { }


  public ngOnInit(): void {
    this.api.getAllProducts$().subscribe((products) => (this.products = products));
  }

  deleteProduct(product: Product) {
    this.api
      .deleteProduct(product)
      .subscribe(
        () => {
          this.products = this.products.filter((t) => t.id !== product.id);
          this.alertActive = true
          setTimeout(() => {
            this.alertActive = false;
          }, 2500);
        }
      )
  }
}
