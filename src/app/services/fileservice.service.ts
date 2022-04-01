import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../models/FileModel';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {
  readonly APIUrl = "https://localhost:44353/api/file/";
  token: any = localStorage.getItem("token");
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('Content-type', 'application/json');
  constructor(private http: HttpClient) { }
  getFiles(): Observable<any> {
    return this.http.get<any>(this.APIUrl+"getFiles", { headers: this.headers });
  }
  uploadFile(file: FileModel): Observable<any> {
    return this.http.post<any>(this.APIUrl + "addFile", file, { headers: this.headers });
  }
  upload(formData: FormData) {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    return this.http.post<any>(this.APIUrl + "upload", formData, { reportProgress: true, observe: 'events', headers: headers });
  }
  getFilesByFolder(folderModel: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + "getFilesByFolderName", folderModel, { headers: this.headers });
  }
  deleteFile(fileModel: any) {
    return this.http.post<any>(this.APIUrl + "deleteFile", fileModel, { headers: this.headers });
  }
  updateFile(fileModel: any) {
    return this.http.post<any>(this.APIUrl + "updateFile", fileModel, { headers: this.headers });
  }
  downloadFile(fileModel: any) {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    return this.http.post(this.APIUrl + "download", fileModel, { observe: 'response', responseType: 'blob', headers: headers });
  }
}
