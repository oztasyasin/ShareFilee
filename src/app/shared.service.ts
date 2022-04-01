import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoginModel } from './models/LoginModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cookie } from 'ng2-cookies';
import { FileModel } from './models/FileModel';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  [x: string]: any;
  readonly APIUrl = "https://localhost:44353/api/";
  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  token: any = "";
  userId:any = localStorage.getItem("userId");
  jwt:any = localStorage.getItem("token");
  constructor(private http: HttpClient) {

  }
  login(loginModel: LoginModel): Observable<any> {
    let headers = new HttpHeaders();
  
    return this.http.post(this.APIUrl + 'auth/login', loginModel);
  }
  getFiles(): Observable<any> {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.get<any>("https://localhost:44353/api/file/getFiles", { headers: headers });
  }
  getFolders(): Observable<any> {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    const userModel={
      Mail: localStorage.getItem("mail"),
      Password: null,
      RememberMe: true
    }
    return this.http.post(this.APIUrl + 'folder/getFolders',userModel,{headers:headers});
  }
  register(registerModel: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post(this.APIUrl + "auth/register", registerModel, { responseType: 'text' });
  }
  uploadFile(file: FileModel): Observable<any> {
 
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl + "user/addFile", file, { headers: headers });
  }
  upload(formData: FormData) {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl + "user/upload", formData, { reportProgress: true, observe: 'events',headers:headers });
  }
  changeFolder(folderName: any, selectedFolderName: string): Observable<any> {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post(this.APIUrl + "user/setFolder", {folderName} , {headers:headers});
  }
  createNewFolder(folderModel: any) {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post(this.APIUrl + "user/createNewFolder", folderModel,{headers:headers});
  }
  updateFolder(folderModel: any) {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post(this.APIUrl + "user/updateFolder", folderModel,{headers:headers})
  }
  getFilesByFolder(folderModel: any): Observable<any> {
    //https://localhost:44353/api/user/getFilesByFolderName
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl + "user/getFilesByFolderName", folderModel, { headers:headers});
  }
  deleteFile(fileModel:any){
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl + "user/deleteFile",fileModel,{headers:headers});
  }
  updateFile(fileModel:any){
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl + "user/updateFile", fileModel,{headers:headers});
  }
  downloadFile(fileModel:any){
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post(this.APIUrl + "file/download",fileModel,{observe:'response',responseType:'blob',headers:headers});
  }
  deleteFolder(folderModel:any){
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl+ "user/deleteFolder",folderModel,{headers:headers});
  }
  generateLink(model:any): Observable<any> {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl+ "user/generateDisposableLink",model,{headers:headers});
  }
  getLinks(model:any){
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl + "user/getMyLinks",model,{headers:headers});
  }
  removeLink(model:any){
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    return this.http.post<any>(this.APIUrl + "user/removeLink",model,{headers:headers});
  }
  getUserId(){
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('Content-type', 'application/json');
    const model={
      Mail: localStorage.getItem("mail"),
      Password: null,
      RememberMe: true
    }
    return this.http.post(this.APIUrl + "auth/getUserId",model,{headers:headers});
  }
}
