import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FolderserviceService } from '../services/folderservice.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-updatefolders',
  templateUrl: './updatefolders.component.html',
  styleUrls: ['./updatefolders.component.css']
})
export class UpdatefoldersComponent implements OnInit {
  constructor(private service:FolderserviceService) { }
  state:boolean= false;
  opacity:any = 0;
  stateText:any = "Klasör güncellenemedi.";
  textColor:any = "red";
  folders:any[] = [];
  selectedFolder:any = {
    id: 0,
    folderName : "Klasör Adı",
    folderDescription : "Klasör Açıklaması"
  };
  comboboxText: any = "Klasör Seçiniz";
  ngOnInit(): void {
    const model={
      Mail: localStorage.getItem("mail"),
      Password: null,
      RememberMe: true
    }
    this.service.getFolders(model).subscribe((data:any)=>{
      this.folders = data;
    })
  }
  comboboxSelectedItemChange(i:number){
    this.comboboxText = this.folders[i].folderName;
    this.selectedFolder = this.folders[i];
  }
  saveChanges(updateForm:NgForm){
    const previousName = this.selectedFolder.folderName;
    const folderModel={
      id: this.selectedFolder.id,
      folderName : updateForm.value.Name,
      folderDescription: updateForm.value.Description
    };
    const model = {
      folder: folderModel,
      previousName: previousName,
      userId: localStorage.getItem("userId")
    };
    this.service.updateFolder(model).subscribe((data:any)=>{
      this.state = data;
      if(this.state){
        this.stateText = "Klasör güncellendi."
        this.textColor = "green"
      }
      else{
        this.stateText = "Klasör güncellenemedi.";
        this.textColor = "red";
      }
      this.opacity = 1;
      setTimeout(() => {
        this.opacity =0
      }, 2000);
    });
  }
  deleteFolder(){
    const model={
      Folder : this.selectedFolder,
      UserId: localStorage.getItem("userId"),
      PreviousName: ""
    }
    this.service.deleteFolder(model).subscribe((data:any) =>{
    });
  }
}
