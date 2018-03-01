import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from "../messages/message.service";
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Router, ActivatedRoute }            from '@angular/router';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient,private messageService: MessageService) { }

  private Url = 'http://localhost:9000';  // URL to web api
  private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: "response" as 'body',
  };
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
  private log(message: string) {
   this.messageService.add('University Service: ' + message);
  }
  getListOfUniversities():Observable<any>{
    return this.http.get(this.Url+"/universities")
    .pipe(
      tap((response:any) => {
        this.log(`fetched list of universities`);
        console.log(response);
        return this.getNameandId(response);
        
        //return universityNames;
    }),
      catchError(this.handleError('list of universities', []))
    );
  }
  getFormFields(id: any): Observable<any> {
    const url = this.Url + `/universities/${id}/formFields`;
    return this.http.get(url)
    .pipe(
      tap((response:any) => {
        this.log(`fetched list of universities`);
    }),
      catchError(this.handleError('list of universities', []))
    );
  }

  getNameandId(universities: any):Array<any>{
    let arr=[];
      universities.forEach(element => {
      arr.push({"name":element.name,"id":element.id});
    },

  );
    return arr;
  }
}
