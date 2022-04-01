import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../models/FileModel';
import { SharedService } from '../shared.service';
import { FileserviceService } from '../services/fileservice.service';
import { FolderserviceService } from '../services/folderservice.service';
@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  state:boolean = false;
  opacity:any = 0;
  stateText:any = "Klasör güncellenemedi.";
  textColor:any = "red";
  comboBoxText: string = "Klasörler";
  userId: any = "";
  fileName: any = "";
  fileExtention: any = "";
  fileSize: any = "";
  uploadTime: any = "";
  selectedFolderName: string = "";
  currentFile : FileModel = {
    Name : "",
    Extention:"",
    Size:0, 
  };
  folders: any[] = [];
  constructor(private http: HttpClient, private service:FileserviceService,private folderService:FolderserviceService) { }
  selectedFile!: File;
  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    const model={
      Mail: localStorage.getItem("mail"),
      Password: null,
      RememberMe: true
    }
    this.folderService.getFolders(model).subscribe((data:any)=>{
      this.folders = data;
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile?.name.split('.')[0];
    this.fileSize  = this.selectedFile?.size + " byte";
    this.fileExtention = "." + this.selectedFile?.type.split('/')[1];
    this.currentFile.Name = this.fileName;
    this.currentFile.Size = this.selectedFile?.size;
    this.currentFile.Extention = this.fileExtention;
  }
  dropdownSelectedItemChange(name:string){
    this.selectedFolderName = name;
    this.comboBoxText = this.selectedFolderName;
    const data = {
      folderName : this.selectedFolderName
    }
  }
  onUpload() {
    // this.service.uploadFile(this.currentFile).subscribe((data:any)=>{
    //   this.state = data;
    //   if(this.state){
    //     this.stateText = "Dosya Kaydedildi."
    //     this.textColor = "green"
    //   }
    //   else{
    //     this.stateText = "Dosya Kaydedilemedi.";
    //     this.textColor = "red";
    //   }
    //   this.opacity = 1;
    //   setTimeout(() => {
    //     this.opacity =0
    //   }, 2000);
    // });
    const formData = new FormData();
    const model = {
      file: this.selectedFile,
      folder: this.selectedFolderName,
      userId: this.userId,
      fileExtention: this.currentFile.Extention,
      fileSize: this.currentFile.Size,
    }
    formData.append('file',this.selectedFile,this.fileName);
    formData.append('folder',this.selectedFolderName);
    formData.append('userId', this.userId);
    formData.append('fileExtention', this.currentFile.Extention);
    formData.append('fileSize',this.currentFile.Size);
    console.log(this.currentFile.Size);
    
    this.service.upload(formData).subscribe((data:any)=>{
      this.state = data;
      if(this.state){
        this.stateText = "Dosya Kaydedildi."
        this.textColor = "green"
      }
      else{
        this.stateText = "Dosya Kaydedilemedi.";
        this.textColor = "red";
      }
      this.opacity = 1;
      setTimeout(() => {
        this.opacity =0
      }, 2000);
    });
  }
}
