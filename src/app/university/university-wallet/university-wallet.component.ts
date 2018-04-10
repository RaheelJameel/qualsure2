import { Component, OnInit } from '@angular/core';
import {UniversityService} from '../university.service';

@Component({
  selector: 'app-university-wallet',
  templateUrl: './university-wallet.component.html',
  styleUrls: ['./university-wallet.component.scss']
})
export class UniversityWalletComponent implements OnInit {
  publicAddress: String;
  accountBalance: String;
  uniID: any;
  constructor(private universityService: UniversityService) {
    this.getUniversityPublicAddress();
    this.getAccountBalance();
    this.getUniversityInfo();
   }
  
   getUniversityInfo() {
    this.universityService.getInfo
    .subscribe(response => {
      if (response.body) {
        this.uniID = this.universityService.university.accountId;
      }
    },
    error => {
    });
   }
  getUniversityPublicAddress() {
    this.universityService.getPublicAddress().subscribe(
      response => {
        this.publicAddress=response.body.publicAddress;
      },
      error => {
      }
    )
  }
  getAccountBalance() {
    this.universityService.getAccountBalance().subscribe(
      response => {
        this.accountBalance=response.body.accountBalance;
      },
      error => {
      }
    )
  }
  ngOnInit() {
  }

}
