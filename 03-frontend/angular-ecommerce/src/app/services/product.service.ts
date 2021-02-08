import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl='http://localhost:8080/api/Products'
  constructor(private httpClient:HttpClient) { }

getProductList():Observable<Product[]>{
return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
  map(response=>response._embedded.Products));

}

}
interface GetResponse{
_embedded:{
  
 Products:Product[];
}
}
