import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkserviceService {
  readonly APIUrl = "https://localhost:44353/api/link/";
  token: any = localStorage.getItem("token");
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('Content-type', 'application/json');
  constructor(private http: HttpClient) { }
  generateLink(model:any): Observable<any> {
    return this.http.post<any>(this.APIUrl+ "generateDisposableLink",model,{headers:this.headers});
  }
  getLinks(model:any){
    return this.http.post<any>(this.APIUrl + "getMyLinks",model,{headers:this.headers});
  }
  removeLink(model:any){
    return this.http.post<any>(this.APIUrl + "removeLink",model,{headers:this.headers});
  }
}
