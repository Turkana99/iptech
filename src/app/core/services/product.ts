import { Injectable } from '@angular/core';
import { IPaginatorOptions } from '../consts';
import { forkJoin, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getList(paginatorOptions: IPaginatorOptions) {
    return this.http.get(environment.Products?.getList(paginatorOptions));
  }

  getProductPageData() {
    return this.http.get(environment.ProductPages?.get());
  }

  getBySlug(slug: string) {
    return this.http.get(environment.Products.getBySlug(slug));
  }

  getAllData(paginatorOptions: IPaginatorOptions) {
    return forkJoin([
      this.getList(paginatorOptions),
      this.getProductPageData(),
    ]).pipe(
      map(([products, productPage]) => {
        return {
          products,
          productPage,
        };
      })
    );
  }
}
