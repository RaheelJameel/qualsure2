import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from "../messages/message.service";
import { of }         from 'rxjs/observable/of';
import {University} from './university';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import {TokenStorage} from "./token.storage";
import { Router, ActivatedRoute }            from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UniversityService {
  isloggedin: boolean;
  private university: University;
  private universityUrl = 'http://localhost:8080';  // URL to web api
  private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: "response" as 'body',
  };
  private logoutObservable = new BehaviorSubject<any>(false);
  public logoutObservable$ = this.logoutObservable.asObservable();
  private loginObservable = new BehaviorSubject<any>(false);
  public loginObservable$ = this.loginObservable.asObservable();
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError (operation = 'operation', result?: any) {
  return (error: any): Observable<any> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
    result=error;
    // Let the app keep running by returning an empty result.
    //return of(result as any);
     return new ErrorObservable(result);
    
  };
}

  constructor(private http: HttpClient, private messageService: MessageService,private tokenStorage: TokenStorage, private router: Router) { }

  private log(message: string) {
    this.messageService.add('University Service: ' + message);
  }
  authenticate (loginDetails: any): Observable<any> {
    let Url = this.universityUrl + '/token/generate-token'
    return this.http.post(Url, loginDetails, this.httpOptions).
    pipe(
      tap((auth: any) => {
        this.log(`auth req sent for user`);
        console.log(auth);
        this.isloggedin=true;
        this.tokenStorage.saveToken(auth.body.token);
        let id=auth.body.location.split("/");
        id=id[id.length-1];
        this.tokenStorage.saveId(id);
        this.loginObservable.next(true);  
      }),
      catchError(this.handleError('auth'))
    );
}

 signupUser (signupDetails: any): Observable<any> {
  let Url = this.universityUrl + '/signup'
  return this.http.post(Url, signupDetails, this.httpOptions)

  .pipe(
    tap((signup: any) => this.log(`signup req sent for user`)),
    catchError(this.handleError('signup'))
  ) 
}
  hello (): Observable<{}> {
    return this.http.get(this.universityUrl+"/hello")
      .pipe(
        tap(degrees => this.log(`fetched degrees`)),
        catchError(this.handleError('getDegrees', []))
      );
  }
  getUniversityInfo(id: any): Observable<any> {
    let Url = this.universityUrl + '/universities/'+id;
    return this.http.get(Url,this.httpOptions)
      .pipe(
        tap((universiyInfo: any) => this.log(`fetched University Info`)),
        catchError(this.handleError('University Info'))
      )
  }
  logout(){
    this.tokenStorage.signOut();
    this.isloggedin=false;
    this.inforSubs();
    this.router.navigate(["/university"]);
  }
  checkLogin() : boolean{
    if(this.tokenStorage.getToken() && this.tokenStorage.getId()){
      this.isloggedin=true;
      this.loginObservable.next(true);  
      return true;
    }
    else
      return false;
  }
  inforSubs() { 
    this.logoutObservable.next(true);  
  }
}

