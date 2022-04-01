import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FolderserviceService } from '../services/folderservice.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-createnewfolder',
  templateUrl: './createnewfolder.component.html',
  styleUrls: ['./createnewfolder.component.css']
})
export class CreatenewfolderComponent implements OnInit {

  constructor(private service:FolderserviceService) { }
  state:boolean= false;
  opacity:any = 0;
  stateText:any = "Klasör oluşturulamadı.";
  textColor:any = "red";
  folderModel:any = {
    folder: "",
    parentFolderName : ""
  }
  ngOnInit(): void {}
  newFolderEvent(newFolderForm:NgForm){
    const folder = {
      folderName : newFolderForm.value.folderName,
      folderDescription : newFolderForm.value.fodlerDescription
    }
    this.folderModel.folder = folder;
    this.folderModel.parentFolderName = localStorage.getItem('userId');
    this.service.createNewFolder(this.folderModel).subscribe((data:any)=>{
      this.state = data;
      if(this.state){
        this.stateText = "Klasör oluşturdu."
        this.textColor = "green"
      }
      else{
        this.stateText = "Klasör oluşturulamadı.";
        this.textColor = "red";
      }
      this.opacity = 1;
      setTimeout(() => {
        this.opacity =0
      }, 2000);
    });
  }
}
