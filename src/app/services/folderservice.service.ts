import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderserviceService {
  readonly APIUrl = "https://localhost:44353/api/folder/";
  token: any = localStorage.getItem("token");
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('Content-type', 'application/json');
  constructor(private http: HttpClient) { }
  getFolders(model:any): Observable<any> {
    return this.http.post(this.APIUrl + 'getFolders',model,{headers:this.headers});
  }
  createNewFolder(folderModel: any) {
    return this.http.post(this.APIUrl + "createNewFolder", folderModel,{headers:this.headers});
  }
  updateFolder(folderModel: any) {
    return this.http.post(this.APIUrl + "updateFolder", folderModel,{headers:this.headers})
  }
  deleteFolder(folderModel:any){
    return this.http.post<any>(this.APIUrl+ "deleteFolder",folderModel,{headers:this.headers});
  }
  changeFolder(folderName: any, selectedFolderName: string): Observable<any> {
    return this.http.post(this.APIUrl + "setFolder", {folderName} , {headers:this.headers});
  }
}
