import { Component, OnInit, OnDestroy } from '@angular/core';
import { UniversityService } from '../../university/university.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  loginObserSub: Subscription;
  universityName: string;
  constructor(
    private universityService: UniversityService,
  ) {
    this.subcribeToLoginObservable();
  }

  ngOnInit() {
  }

  logout() {
    this.isLoggedIn = false;
    this.universityService.logout();
  }

  subcribeToLoginObservable() {
    this.loginObserSub = this.universityService.loginObservable$
      .subscribe((data) => {
        if (data) {
          this.isLoggedIn = true;
          this.universityName=this.universityService.university.name;
        }
      });
  }

  ngOnDestroy() {
    this.loginObserSub.unsubscribe();
  }
}
