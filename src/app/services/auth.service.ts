import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

interface LoginResponse {
  jwtToken: string,
  userId:number
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

  saveLoginData(token: string, userId: number): void {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userId.toString());
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  getUserId(): number | null {
    const id = localStorage.getItem("userId");
    return id ? parseInt(id, 10) : null;
  }

  isLoggedIn():boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
  }

}
