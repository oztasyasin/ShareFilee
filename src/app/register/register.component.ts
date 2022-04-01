import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private service: AuthserviceService) { }
  registeModel: any = {
    Mail: "",
    Password: "",
  }
  registerOpacity: any = 0;
  registerText: any = "Kayıt işlemi başarısız.";
  ngOnInit(): void {
  }
  goLoginPage() {
    this.router.navigate(['login']);
  }
  registerTextOpacity(){
    this.registerOpacity = 1;
    setTimeout(() => {
      this.trueResult();
    }, 3000);
  }
  trueResult(){
    this.registerOpacity = 0;
    this.router.navigate(['login']);
  }
  registerEvent(registerForm: NgForm) {

    this.registeModel.Mail = registerForm.value.Mail;
    this.registeModel.Password = registerForm.value.Password;
    this.service.register(this.registeModel).subscribe((data:any)=>{
      if(data!=null){
        localStorage.setItem("userId", data);
        this.registerText = "Kayıt işlemi başarılı. Giriş sayfasına yönlendiriliyorsunuz.";
      }
      else{
        this.registerText = "Kayıt işlemi başarısız. Bilgilerinizi kontrol edip tekrar deneyiniz.";
      }
      this.registerTextOpacity();
    });
  }
}
