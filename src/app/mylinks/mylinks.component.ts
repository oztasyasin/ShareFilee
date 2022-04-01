import { Component, Input, OnInit } from '@angular/core';
import { LinkserviceService } from '../services/linkservice.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-mylinks',
  templateUrl: './mylinks.component.html',
  styleUrls: ['./mylinks.component.css']
})
export class MylinksComponent implements OnInit {
  links:any [] = [];
  constructor(private service:LinkserviceService) { }

  ngOnInit(): void {
    const model = {
      userId: localStorage.getItem("userId"),
    }
    this.service.getLinks(model).subscribe((data:any)=>{
      this.links = data;
    })
  }
  removeLink(i:number){
    this.service.removeLink(i).subscribe((data:any)=>{
      this.links = data;
    });
  }
}
