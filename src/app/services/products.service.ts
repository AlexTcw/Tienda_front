import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productPath = environment.hostBackend + 'product';

  constructor(private http: HttpClient) {
  }

  getProduct(id:number): Observable<any> {
    return this.http.get(`${this.productPath}/${id}`, { withCredentials: true });
  }

  getAllProducts():Observable<any> {
    return this.http.get(`${this.productPath}`);
  }

  updateProduct(product:any): Observable<any> {
    return this.http.patch(`${this.productPath}`, product);
  }

  findProductByKeyWord(keyWord:string):Observable<any> {
    if (keyWord != undefined) {
      return this.http.get(`${this.productPath}/search?keyword=${keyWord}`);
    }
    return this.http.get(`${this.productPath}/search`);
  }

  deleteProductById(id:number):Observable<any> {
      return this.http.delete(`${this.productPath}/${id}`);
  }

  addProduct(data:any):Observable<any> {
    return this.http.post(`${this.productPath}`, data);
  }

  getOutOfStockProducts():Observable<any> {
    return this.http.get(`${this.productPath}/out-of-stock`);
  }

}
