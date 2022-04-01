import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderModel } from '../models/FolderModel';
import { FileserviceService } from '../services/fileservice.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  constructor(private fileService:FileserviceService,private router: Router) { 
  }
  folder:any;
  files:any [] = [];
  ngOnInit(): void {
    this.folder = history.state.data.folder;
    this.getFiles();
  }
  getFiles(){
    const folderModel={
      id: this.folder.id,
      folderName : localStorage.getItem("userId")+"\\"+this.folder.folderName,
      folderDescription: this.folder.folderDescription,
    }
    this.fileService.getFilesByFolder(folderModel).subscribe((data:any)=>{
      this.files = data;
    });
  }
  fileSelected(file:any){
    this.router.navigate(['home/updateFile'],{state:{data:{file:file,folder:this.folder}}});
  } 
}
