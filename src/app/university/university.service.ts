import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';

import { qualsureBEPort } from '../common/constants';
import { CommonService } from '../services/common.service';
import { MessageService } from '../messages/message.service';

import { University } from './university';
import { TokenStorage } from './token.storage';
import { FieldGroupAPI } from '../services/common.service';

@Injectable()
export class UniversityService {
  public static EMPTY: any;

  isloggedin: boolean;
  public university: University;
  private universityUrl = this.commonService.webisteURL + ':' + qualsureBEPort;  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'body',
  };
  private logoutObservable = new ReplaySubject<any>(1);
  public logoutObservable$ = this.logoutObservable.asObservable();
  private loginObservable = new BehaviorSubject<any>(false);
  public loginObservable$ = this.loginObservable.asObservable();

  getInfo =  new Observable<any>((observer) => {
      this.getUniversityInfo(this.tokenStorage.getId())
        .subscribe((response) => {
            this.emitLoginObservable();
            observer.next(response); observer.complete();
          }, (error) => {
            observer.error(error);
          });

  });

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError (operation = 'operation', result?: any) {
  return (error: any): Observable<any> => {
    if(operation === 'University Info')
      this.logout();
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
    result=error;
    // Let the app keep running by returning an empty result.
    //return of(result as any);
     return new ErrorObservable(result);
    
  };
}

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private tokenStorage: TokenStorage,
    private router: Router,
    private commonService: CommonService,
  ) { }

  private log(message: string) {
    this.messageService.add('University Service: ' + message);
  }

  authenticate (loginDetails: any): Observable<any> {
    let Url = this.universityUrl + '/token/generate-token';
    return this.http.post(Url, loginDetails, this.httpOptions).
    pipe(
      tap((auth: any) => {
        this.isloggedin=true;
        this.tokenStorage.saveToken(auth.body.token);
        let id=auth.body.location.split("/");
        id=id[id.length-1];
        this.tokenStorage.saveId(id);
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
    );
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
        tap((universityInfo: any) =>{ 
          this.log(`fetched University Info`);
          this.university=new University;
          this.university.id=universityInfo.body.id;
          this.university.accountId=universityInfo.body.accountId;
          this.university.name=universityInfo.body.name;
          this.university.formFields=universityInfo.body.formFields;
          this.university.firstTime=universityInfo.body.firstTime;
        }
      ),
        catchError(
          this.handleError('University Info'))
      )
  }

  getSpecificUniveristyInfo(id: string): Observable<any> {
    const url = this.universityUrl + '/universities/' + id;
    return this.http.get(url, this.httpOptions)
      .pipe(
        tap((universiyInfo: any) => this.log(`fetched getUniveristyName`)),
        catchError(this.handleError('getUniveristyName'))
      );
  }


  logout(){
    this.tokenStorage.signOut();
    this.isloggedin=false;
    this.emitLogoutObservable();
    for (const prop of Object.getOwnPropertyNames(this.university)) {
      delete this.university[prop];
    }
    this.router.navigate(["/university"]);
  }
  checkLogin(): boolean {
    if (this.tokenStorage.getToken() && this.tokenStorage.getId()){
      this.isloggedin = true;
      return true;
    } else
      return false;
  }

  emitLogoutObservable() {
    this.logoutObservable.next(true);
    this.logoutObservable.next(false);
  }

  emitLoginObservable() {
    this.loginObservable.next(true);
    this.loginObservable.next(false);
  }

  getDefaultFormFields(): Observable<any> {
    const url = this.universityUrl + '/fixedFormFields';
    return this.http.get(url, this.httpOptions)
      .pipe(
        tap((universiyInfo: any) => this.log(`fetched DefaultFormFields`)),
        catchError(this.handleError('DefaultFormFields'))
      );
  }

  // I think independentCheck is to forcefully get the formfields and not save it in the uni object
  // For the Student component
  getFormFields(uniID?: string, independentCheck?: boolean): Observable<any> {
    if (independentCheck) {
      const url = this.universityUrl + `/universities/${uniID}/formFields`;
      return this.http.get(url)
        .pipe(
            tap((universiyInfo: any) => {
              this.log(`fetched UnivesityFormFields`);
            }),
            catchError(this.handleError('getFormFields'))
          );
    } else {
      if (!(this.university.formFields && this.university.formFields.length)) {
        return this.getDefaultFormFields();
      } else {
        let url;
        if (uniID) {
          url = this.universityUrl + `/universities/${uniID}/formFields`;
        } else {
          url = this.universityUrl + `/universities/${this.university.accountId}/formFields`;
        }
        return this.http.get(url, this.httpOptions)
          .pipe(
            tap((universiyInfo: any) => {
              universiyInfo.body = universiyInfo.body.formFields;
              this.log(`fetched UnivesityFormFields`);
            }),
            catchError(this.handleError('getFormFields'))
          );
      }
    }
  }

  getDefaultValidators(): Observable<any> {
    const url = this.universityUrl + '/validators';
    return this.http.get(url, this.httpOptions)
      .pipe(
        tap((universiyInfo: any) => this.log(`fetched UDefaultFormFields`)),
        catchError(this.handleError('DefaultFormFields'))
      );
  }

  saveUniversityInfo(): Observable<any> {
    const url = this.universityUrl + `/universities`;
    return this.http.put(url, this.university, this.httpOptions)
      .pipe(
        tap((uniInfo: any) => this.log(`postUniversityInfo req sent for user`)),
        catchError(this.handleError('postUniversityInfo'))
      );
  }

  checkUsernameAvailability(username): Observable<any>{
    const url = this.universityUrl + `/checkUsername/${username}`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        tap((avail: any) => this.log(`checked username availability`)),
        catchError(this.handleError('Username Availability'))
      );
  }

  saveFormFields(formFields: FieldGroupAPI[]): Observable<any> {
    this.university.formFields = formFields;
    return this.saveUniversityInfo();
  }

  addDegree(degree,password) {
    const url = this.universityUrl + `/universities/${this.university.accountId}/degrees`;
    degree.password=password;
    return this.http.post(url, degree, this.httpOptions)
      .pipe(
        tap((degreeInfo: any) => this.log(`addDegree req sent for user`)),
        catchError(this.handleError('addDegree'))
      );
  }

  getPublicAddress(){
    const url = this.universityUrl + `/universities/${this.tokenStorage.getId()}/getPublicAddress`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        tap((degreeInfo: any) => this.log(`getPublicAddress req sent for user`)),
        catchError(this.handleError('getPublicAddress'))
      );
  }
  getAccountBalance(){
    const url = this.universityUrl + `/universities/${this.tokenStorage.getId()}/getAccountBalance`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        tap((degreeInfo: any) => this.log(`getPublicAddress req sent for user`)),
        catchError(this.handleError('getPublicAddress'))
      );
  }
  addMultipleDegrees(degreeDetails,password){
    const url = this.universityUrl + `/universities/${this.tokenStorage.getId()}/multipleDegrees`;
    degreeDetails.password=password;
    return this.http.post(url, degreeDetails, this.httpOptions)
      .pipe(
        tap((degreeInfo: any) => this.log(`MultipleAddDegree req sent for user`)),
        catchError(this.handleError('MultipleAddDegree'))
      );
  }
}

