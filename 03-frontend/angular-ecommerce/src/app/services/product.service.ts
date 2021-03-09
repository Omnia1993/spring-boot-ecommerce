import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api/Products'
  private categoryUrl = 'http://localhost:8080/api/product-category'
  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number):Observable<Product> {
    // need to build Url based on product id 
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return  this.httpClient.get<Product>(productUrl);
  }


  getProductList(theCategoryId: number): Observable<Product[]> {
    //need to build URL based on category id..
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);


    
  }

  searchProducts(theKeyWord: string):Observable<Product[]> {
    //need to build URL based on the keyword...
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.P)

    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.omnia)
      );
  }
}
interface GetResponseProducts {
  _embedded: {
    P: Product[];
  }
}
interface GetResponseProductCategory {
  _embedded: {
    omnia: ProductCategory[];
  }

}