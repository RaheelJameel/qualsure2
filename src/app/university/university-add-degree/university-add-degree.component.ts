import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UniversityService } from '../university.service';
import { FieldGroupAPI } from '../../services/common.service';
import { AlertService } from '../../common/angular2-alert-notifications/_services/index';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-university-add-degree',
  templateUrl: './university-add-degree.component.html',
  styleUrls: ['./university-add-degree.component.scss']
})
export class UniversityAddDegreeComponent implements OnInit {

  uniID: string;
  private serverUrl = 'http://localhost:8090';
  private stompClient;


  constructor(
    private router: Router,
    private universityService: UniversityService,
    private alertService: AlertService
  ) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    var socket = io("http://localhost:8090");
    console.log('Connecting');
    socket.on("connect", function () {
      console.log('Connected');
      socket.on("message", function (msg) {
        console.log('Received message: '+msg);
        if($("#events_list").text() == "No Transaction Found"){
          $("#events_list").html("<li>Txn Hash: " + msg.transactionHash +
          "nOwner: " + msg.args.owner + "nFile Hash: " + msg.args.fileHash +
          "</li>");
        }
        else{
          $("#events_list").prepend("<li>Txn Hash: " + msg.transactionHash +
          "nOwner: " + msg.args.owner + "nFile Hash: " + msg.args.fileHash +
          "</li>");
        }
      });
    });
  }

  // sendMessage(message) {
  //   this.stompClient.send('/app/send/message' , {}, message);
  //   $('#input').val('');
  // }

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
