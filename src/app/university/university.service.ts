import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from "../messages/message.service";
import { of }         from 'rxjs/observable/of';

@Injectable()
export class UniversityService {
  private universityUrl = '/university';  // URL to web api
  private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add('University Service: ' + message);
  }
  authenticate (loginDetails: {}): Observable<{}> {
  var Url = this.universityUrl + '/authenticate'
  return this.http.post<{}>(Url, loginDetails, this.httpOptions).pipe(
    tap((auth: {}) => this.log(`auth req sent for user`)),
    catchError(this.handleError<{}>('auth'))
  );
}

 signupUser (signupDetails: {}): Observable<{}> {
  var Url = this.universityUrl + '/signup'
  return this.http.post<{}>(Url, signupDetails, this.httpOptions).pipe(
    tap((signup: {}) => this.log(`signup req sent for user`)),
    catchError(this.handleError<{}>('signup'))
  );
}
}
