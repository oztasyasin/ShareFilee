import { Component, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthserviceService, private router: Router) { }
  userName = localStorage.getItem("userName");
  leftColors: any [5] = [];
  model={
    Mail: localStorage.getItem("mail"),
    Password: null,
    RememberMe: true
  }
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {}
  showFolders(){
    this.setAllFalse();
    this.leftColors[0] = "rgb(205, 255, 0)";
  }
  createNewFolder(){
    this.setAllFalse();
    this.leftColors[1] = "rgb(205, 255, 0)";
  }
  updateFoldersClick(){
    this.setAllFalse();
    this.leftColors[2] = "rgb(205, 255, 0)";
  }
  uploadFile(){
    this.setAllFalse();
    this.leftColors[3] = "rgb(205, 255, 0)";
  }
  getMyLinks(){
    this.setAllFalse();
    this.leftColors[4] = "rgb(205, 255, 0)";
 }
  setAllFalse(){
    for(let i=0; i<this.leftColors.length; i++){
      this.leftColors[i] = "grey";
    }
  }
  logout() {
    const model={
      mail: localStorage.getItem("mail"),
      password: null,
      rememberMe: false,
    }
    this.authService.logoff(model).subscribe((data:any)=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("mail");
      this.router.navigate(['login']);
    });
  }
}
