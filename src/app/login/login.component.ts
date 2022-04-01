import { Component, Input, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private service: AuthserviceService) { }
  id:any = "";
  invalidLogin:boolean = true;
  loginStateText:any = "";
  loginStateFrameOpacity:any = 0;
  w: any;
  h: any;
  logoSize: any = '';
  mail: string = "";
  password: string = "";
  loginModel: any = {
    Mail : "",
    Password : "",
    RememberMe : true
  }
  ngOnInit(): void {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.logoSize = this.w * 0.12 + 'px';
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }
  registerTextOpacity(){
    this.loginStateFrameOpacity = 1;
    setTimeout(() => {
      this.trueResult();
    }, 3000);
  }
  trueResult(){
    this.loginStateFrameOpacity = 0;
    this.router.navigate(['home/showFolders']);
  }
  loginButtonClickEvent(form:NgForm) {
    this.loginModel.Mail = form.value.Mail;
    this.loginModel.Password = form.value.Password;
    this.loginModel.RememberMe = true;
    var token:any;
    this.service.login(this.loginModel).subscribe((data:any) =>{
      console.log(data);
      token = data.token;
      localStorage.setItem("mail",this.loginModel.Mail);
      localStorage.setItem("token",token);
      this.invalidLogin = false;
      if(token!=null){
        this.invalidLogin = true;
        this.loginStateText = "Giriş işlemi başarılı. Home sayfasına yönlendiriliyorsunuz.";
        var name = this.loginModel.Mail;
        var split = name.split("@",2);
        name = split[0];
        localStorage.setItem("userName",name)
        this.registerTextOpacity();
      }
      else{
        this.loginStateText = "Giriş işlemi başarısız. Bilgilerinizi kontrol edip tekrar deneyiniz.";
      }
      this.service.getUserId(this.loginModel).subscribe((data:any)=>{
        this.id = data.id;
        console.log(data);
        localStorage.setItem("userId",this.id);
      });
    });

  }
}
