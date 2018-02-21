import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Degree } from './degree';
import { MessageService } from '../messages/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UniversityDegreeService {

  private degreesUrl = 'api/degrees';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET degrees from the server */
  getDegrees (): Observable<Degree[]> {
    return this.http.get<Degree[]>(this.degreesUrl)
      .pipe(
        tap(degrees => this.log(`fetched degrees`)),
        catchError(this.handleError('getDegrees', []))
      );
  }

  /** GET degree by id. Will 404 if id not found */
  getDegree(id: number): Observable<Degree> {
    const url = `${this.degreesUrl}/${id}`;
    return this.http.get<Degree>(url).pipe(
      tap(_ => this.log(`fetched degree id=${id}`)),
      catchError(this.handleError<Degree>(`getDegree id=${id}`))
    );
  }

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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('DegreeService: ', message);
  }
}
