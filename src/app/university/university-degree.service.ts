import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Degree } from './degree';
import { MessageService } from '../messages/message.service';
import {UniversityService} from './university.service';
import {TokenStorage} from './token.storage';

import { webisteURL, qualsureBEPort } from '../common/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UniversityDegreeService {

  private degreesUrl = webisteURL + ':' + qualsureBEPort;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private universityService: UniversityService,
    private tokenStorage: TokenStorage
  ) { }

  /** GET degrees from the server */
  getDegrees (): Observable<Degree[]> {
    let url = this.degreesUrl + '/universities/' + this.tokenStorage.getId() + '/degrees'
    return this.http.get<Degree[]>(url)
      .pipe(
        tap(degrees => this.log(`fetched degrees`)),
        catchError(this.handleError('getDegrees', []))
      );
  }

  /** GET degree by id. Will 404 if id not found */
  getDegree(id: number): Observable<any> {
    let url = this.degreesUrl + '/universities/' + this.tokenStorage.getId() + '/degrees/'+id
    return this.http.get<Degree>(url).pipe(
      tap(_ => {
        this.log(`fetched degree id=${id}`)}),
      catchError(this.handleError<Degree>(`getDegree id=${id}`))
    );
  }
  getFormFields =  new Observable<any>((observer) => {
    this.universityService.getDefaultFormFields().subscribe(
      response => {
        observer.next(response);
        observer.complete();
      },
      error => {
        observer.error(error);
        observer.complete();
      }
    )
  });
  //////// Save methods //////////

  /** POST: add a new degree to the server */
  addDegree (degree: Degree): Observable<Degree> {
    return this.http.post<Degree>(this.degreesUrl, degree, httpOptions).pipe(
      tap((degree: Degree) => this.log(`added degree w/ id=${degree.id}`)),
      catchError(this.handleError<Degree>('addDegree'))
    );
  }

  /** DELETE: delete the degree from the server */
  deleteDegree (degree: Degree | number): Observable<Degree> {
    const id = typeof degree === 'number' ? degree : degree.id;
    const url = `${this.degreesUrl}/${id}`;

    return this.http.delete<Degree>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted degree id=${id}`)),
      catchError(this.handleError<Degree>('deleteDegree'))
    );
  }

  /** PUT: update the degree on the server */
  updateDegree (degree: Degree): Observable<any> {
    return this.http.put(this.degreesUrl, degree, httpOptions).pipe(
      tap(_ => this.log(`updated degree id=${degree.id}`)),
      catchError(this.handleError<any>('updateDegree'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
  }
}
