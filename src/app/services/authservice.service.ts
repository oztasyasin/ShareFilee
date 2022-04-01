import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  readonly APIUrl = "https://localhost:44353/api/auth/";
  token: any = localStorage.getItem("token");
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('Content-type', 'application/json');
  constructor(private http: HttpClient) { }
  login(loginModel: LoginModel): Observable<any> {
    return this.http.post(this.APIUrl + 'login', loginModel);
  }
  register(registerModel: any): Observable<any> {
    return this.http.post(this.APIUrl + "register", registerModel, { responseType: 'text' });
  }
  logoff(model:any){
    return this.http.post(this.APIUrl+"logoff",model);
  }
  getUserId(model:any){
    return this.http.post(this.APIUrl + "getUserId",model,{headers:this.headers});
  }
}
