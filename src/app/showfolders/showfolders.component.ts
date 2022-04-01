import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderserviceService } from '../services/folderservice.service';

@Component({
  selector: 'app-showfolders',
  templateUrl: './showfolders.component.html',
  styleUrls: ['./showfolders.component.css']
})
export class ShowfoldersComponent implements OnInit {

  constructor(private folderService:FolderserviceService,private router: Router) { }
  folders:any [] = [];
  ngOnInit(): void {
    this.getFolders();
  }
  getFolders(){
    const model={
      Mail: localStorage.getItem("mail"),
      Password: null,
      RememberMe: true
    }
    this.folderService.getFolders(model).subscribe((data:any)=>{
      this.folders = data;
    });
  }
  folderSelected(folder:any){
    console.log(folder);
    this.router.navigate(['home/files'],{state:{data:{folder:folder}}});
  }
}
