import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login/login.guard';
import { LoginComponent } from './login/login.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { UpdateitemsComponent } from './updateitems/updateitems.component';
import { CreatenewfolderComponent } from './createnewfolder/createnewfolder.component';
import { UpdatefoldersComponent } from './updatefolders/updatefolders.component';
import { MylinksComponent } from './mylinks/mylinks.component';
import { ShowfoldersComponent } from './showfolders/showfolders.component';
import { FilesComponent } from './files/files.component';
export function tokenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UploadfileComponent,
    UpdateitemsComponent,
    CreatenewfolderComponent,
    UpdatefoldersComponent,
    routingComponents,
    MylinksComponent,
    UpdateitemsComponent,
    ShowfoldersComponent,
    FilesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44353"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
