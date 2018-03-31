import { Injectable }     from '@angular/core';
import { CanActivate, Router  }    from '@angular/router';
import {UniversityService} from './university.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private universityService: UniversityService,private router: Router){}
  canActivate() {
    console.log('AuthGuard#canActivate called');
    if(this.universityService.checkLogin())
    {    
      return true;
    }
    this.router.navigate(['/university']);
    return false;
  }
}