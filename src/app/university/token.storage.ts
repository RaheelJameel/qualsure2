import { Injectable } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';


const TOKEN_KEY = 'AuthToken';
const USER_ID= 'UserId';
@Injectable()
export class TokenStorage {
  
  localStorage: CoolLocalStorage;

    constructor( localStorage: CoolLocalStorage ) { this.localStorage=localStorage}

  signOut() {
    this.localStorage.removeItem(TOKEN_KEY);
    this.localStorage.removeItem(USER_ID);
    this.localStorage.clear();
  }

  public saveToken(token: string) {
    this.localStorage.removeItem(TOKEN_KEY);
    this.localStorage.setItem(TOKEN_KEY,  token);
  }
  public saveId(userId: string) {
    this.localStorage.removeItem(USER_ID);
    this.localStorage.setItem(USER_ID,  userId);
  }
  public getToken(): string {
    return this.localStorage.getItem(TOKEN_KEY);
  }
  public getId(): string {
    return this.localStorage.getItem(USER_ID);
  }
}