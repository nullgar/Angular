import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ProductDetailGuard } from './product-detail.guard';
import { RouterModule } from '@angular/router';
import { ConvertToSpacesPipe } from './../shared/convert-to-space.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id',
        canActivate: [ ProductDetailGuard ],
        component: ProductDetailComponent },
    ]),
    SharedModule
  ]
})
export class ProductModule { }
