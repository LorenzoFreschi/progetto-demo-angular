import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl , ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class ProductComponent {
  @Input() product?: Product;
  @Output() onDeleteProduct: EventEmitter<Product> = new EventEmitter();


  constructor(
  ) {}

  public ngOnInit(): void {
    
    
  }


  onDelete() {
    this.onDeleteProduct.emit(this.product);
  }
}
