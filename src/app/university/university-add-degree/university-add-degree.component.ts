import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UniversityService } from '../university.service';
import { FieldGroupAPI } from '../../services/common.service';
import { AlertService } from '../../common/angular2-alert-notifications/_services/index';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-university-add-degree',
  templateUrl: './university-add-degree.component.html',
  styleUrls: ['./university-add-degree.component.scss']
})
export class UniversityAddDegreeComponent implements OnInit {

  uniID: string;
  private serverUrl = 'http://localhost:9000/socket';
  private stompClient;


  constructor(
    private router: Router,
    private universityService: UniversityService,
    private alertService: AlertService
  ) { 
    this.initializeWebSocketConnection();

  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }

  success(message: string) {
    this.alertService.success(message);
}

  error(message: string) {
    this.alertService.error(message);
  }

  ngOnInit() {
    this.checkUniInfoAndGetFormField();
  }

  checkUniInfoAndGetFormField() {
    this.universityService.getInfo
      .subscribe(response => {
        if (response.body) {
          this.uniID = this.universityService.university.accountId;
        }
      },
      error => {
        console.error(error);
      });
  }

  addDegree(degree) {
    this.universityService.addDegree(degree)
      .subscribe(
      response => {
      if (response) {
        this.success('Degree Added Successfully');
        setTimeout(() => {
          this.router.navigate(['/university']);
        }, 3000);
      }},
      error => {
        console.error(error);
        this.error('Operation Failed');

      }
    );
  }

}
