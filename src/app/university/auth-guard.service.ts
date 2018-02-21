import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {UniversityService} from './university.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private universityService: UniversityService){}
  canActivate() {
    console.log('AuthGuard#canActivate called');
    if(this.universityService.checkLogin())
        return true;
  }
}