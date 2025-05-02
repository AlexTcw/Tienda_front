import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

interface LoginResponse {
  jwtToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authPath:String = environment.hostBackend+"auth";

  constructor(private http: HttpClient) { }

  login(username:string, password:string) :Observable<LoginResponse> {
    const body = {username: username, password: password};
    return this.http.post<LoginResponse>(`${this.authPath}/login`, body)
  }

  saveToken(token:string) {
    localStorage.setItem("authToken", token);
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  isLoggedIn():boolean {
    return this.getToken() !== null;
  }

  logout():void {
    localStorage.removeItem("authToken");
  }

}
