import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AlertComponent } from './components/alert/alert.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: (route: ActivatedRouteSnapshot) => `Dettaglio Prodotto | ${route.paramMap.get('id')}`
  },


  {
    path: 'products/add',
    component: AddProductComponent,
    title: 'Add a product'
  },
  {
    path: '',
    component: ProductListComponent,
    title : 'Lista prodotti'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
