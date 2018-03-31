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

  constructor(private universityService: UniversityService) {
    this.getUniversityPublicAddress();
    this.getAccountBalance();
   }

  getUniversityPublicAddress() {
    this.universityService.getPublicAddress().subscribe(
      response => {
        this.publicAddress=response.body.publicAddress
        console.log(response.body.publicAddress);
      },
      error => {
        console.error(error);
      }
    )
  }
  getAccountBalance() {
    this.universityService.getAccountBalance().subscribe(
      response => {
        this.accountBalance=response.body.accountBalance
        console.log(response.body.accountBalance);
      },
      error => {
        console.error(error);
      }
    )
  }
  ngOnInit() {
  }

}
