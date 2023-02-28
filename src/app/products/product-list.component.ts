import { IProduct } from './products';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;

    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    };

    set listFilter(value: string) {
        this._listFilter = value;
        console.log("In setter:", value);
        this.filteredProducts = this.performFilter(value);
    };

    filteredProducts: IProduct[] = [];

    constructor(private productService: ProductService) {}

    products: IProduct[] = [];

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => {
            return product.productName.toLocaleLowerCase().includes(filterBy);
        }
    )};

    toggleImage() {
        this.showImage = !this.showImage;
    };

    ngOnInit(): void {
      this.listFilter = "";

      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
    };

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
      this.pageTitle = `Product List: ${message}`;
    }
}
