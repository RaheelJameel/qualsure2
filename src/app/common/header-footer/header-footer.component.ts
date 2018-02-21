import { Component, OnInit } from '@angular/core';
import {UniversityService} from '../../university/university.service';
@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private universityService: UniversityService) { 

  }

  ngOnInit() {
  }
  logout(){
    this.isLoggedIn=false;
    this.universityService.logout();
  }
}
