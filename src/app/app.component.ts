import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  title = 'shareFile2';
  ngOnInit(): void {
    this.loginPage();
  }
  loginPage(){
    this.router.navigate(['login'])
  }
}

