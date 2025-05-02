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

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getProduct(id:number): Observable<any> {
    return this.http.get(`${this.productPath}/${id}`, { withCredentials: true });
  }

  getAllProducts():Observable<any> {
    return this.http.get(`${this.productPath}`);
  }

  findProductByKeyWord(keyWord:string):Observable<any> {
    if (keyWord != undefined) {
      return this.http.get(`${this.productPath}/search?keyword=${keyWord}`);
    }
    return this.http.get(`${this.productPath}/search`);
  }

}
