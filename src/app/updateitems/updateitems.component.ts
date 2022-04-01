import { Component, Input, OnInit } from '@angular/core';
import { FileserviceService } from '../services/fileservice.service';
import { LinkserviceService } from '../services/linkservice.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-updateitems',
  templateUrl: './updateitems.component.html',
  styleUrls: ['./updateitems.component.css']
})
export class UpdateitemsComponent implements OnInit {

  constructor(private service: FileserviceService,private linkService: LinkserviceService) { }
  file2:any;
  folder:any;
  state:boolean= false;
  opacity:any = 0;
  stateText:any = "";
  textColor:any = "";
  @Input() file: any;
  fileName:any;
  linkFrameOpacity = 0;
  newName: any = "";
  link:any = "";
  @Input() selectedFolder:any;
  ngOnInit(): void {
    this.file2 = history.state.data.file;
    this.folder = history.state.data.folder;
  }
  onChangeEvent(event: any) {
    this.newName = event.target.value;
  }
  updateFile() {
    var previousName = this.file2.name;
    this.file2.name = this.newName;
    const updateFileModel = {
      file: this.file2,
      folderName: localStorage.getItem("userId")+"\\"+this.folder.folderName,
      userId: localStorage.getItem("userId"),
      previousName: previousName
    }
    console.log(updateFileModel);
    this.service.updateFile(updateFileModel).subscribe((data:any)=>{
      this.state = data;
      if(this.state){
        this.stateText = "Dosya güncellendi."
        this.textColor = "green"
      }
      else{
        this.stateText = "Dosya güncellenemedi.";
        this.textColor = "red";
      }
      this.opacity = 1;
      setTimeout(() => {
        this.opacity =0
      }, 2000);

    });
  }
  deleteFile(){
    const model={
      File: this.file2,
      FolderName: localStorage.getItem("userId")+"\\"+this.folder.folderName,
      UserId: localStorage.getItem("userId"),
      PreviousName: "",
    }
    this.service.deleteFile(model).subscribe((data:any)=>{
      this.state = data;
      if(this.state){
        this.stateText = "Dosya silindi.";
        this.textColor = "green";
        this.file2=[];
      }
      else{
        this.stateText = "Dosya silinemedi.";
        this.textColor = "red";
      }
      this.opacity = 1;
      setTimeout(() => {
        this.opacity =0
      }, 2000);
    });
  }
  downloadFile(){
    const model ={
      File: this.file2,
      Folder: this.folder,
      UserId: localStorage.getItem("userId")
    }
    console.log(model);
    
    this.service.downloadFile(model).subscribe(response =>{
      this.fileName = this.file2.name+this.file2.extention;
      let blob:Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download=this.fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    } );
  }
  setOpacity(){
    this.linkFrameOpacity = 1;
    setTimeout(() => {
      this.linkFrameOpacity = 0;
    }, 5000);
  }
  generateLink(){
    const linkModel={
      FolderName: localStorage.getItem("userId")+"\\"+this.folder.folderName,
      FileId: this.file2.id,
      UserId: localStorage.getItem("userId")
    }
    this.linkService.generateLink(linkModel).subscribe((data:any)=>{
      this.link = "https://localhost:44353/api/file/downloadWithLink?Link="+data.link;
    });
    this.setOpacity();
  }

}
