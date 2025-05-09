import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartPath = environment.hostBackend + 'cart';

  constructor(private http: HttpClient) { }

  createCart(data: any): Observable<any> {
    return this.http.post<any>(`${this.cartPath}`, data);
  }

  findCartByKeyword(keyword:string): Observable<any> {
    return this.http.get<any>(`${this.cartPath}/search/${keyword}`);
  }
}
