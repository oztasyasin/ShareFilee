import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login/login.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatefoldersComponent } from './updatefolders/updatefolders.component';
import { CreatenewfolderComponent } from './createnewfolder/createnewfolder.component';
import { MylinksComponent } from './mylinks/mylinks.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { FilesComponent } from './files/files.component';
import { ShowfoldersComponent } from './showfolders/showfolders.component';
import { UpdateitemsComponent } from './updateitems/updateitems.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"home",component:HomeComponent,
  children:[
    {path:"updateFolders",component:UpdatefoldersComponent},
    {path:"createNewFolder",component:CreatenewfolderComponent},
    {path: "myLinks",component:MylinksComponent},
    {path:"updateFile",component:UpdateitemsComponent},
    {path:"uploadFile",component:UploadfileComponent},
    {path:"files",component:FilesComponent},
    {path:"showFolders",component:ShowfoldersComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,HomeComponent];
