import { Injectable }     from '@angular/core';
import { CanActivate, Router  }    from '@angular/router';
import {UniversityService} from './university.service';

@Injectable()
export class AuthGuardEditForm implements CanActivate {
    constructor(private universityService: UniversityService,private router: Router){}
  canActivate() {
    if (this.universityService.checkLogin() &&
      (this.universityService.university && this.universityService.university.firstTime === 'True')) {
      return true;
    }
    this.router.navigate(['/university']);
    return false;
  }
}