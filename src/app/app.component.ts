import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Variables to be used by enableScrollToTop function
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.enableScrollToTop();
  }

  /*
  * To scroll the page to the top on route change
  * And also keep track of history navigation and restore old scroll location on it
  *
  * As demonstrated by Fernando Echeverria on Stack Overflow
  * https://stackoverflow.com/a/44372167
  */
  enableScrollToTop () {
    this.location.subscribe((ev: PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url !== this.lastPoppedUrl) {
            this.yScrollStack.push(window.scrollY);
        }
      } else if (ev instanceof NavigationEnd) {
        if (ev.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
