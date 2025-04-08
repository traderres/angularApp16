import { Injectable } from '@angular/core';
import {ExceptionRecordDTO} from "../models/exception-record-dto";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExceptionRecordService {

  constructor(private httpClient: HttpClient) { }

  public getAllExceptions(): Observable<ExceptionRecordDTO[]> {
    // Construct the URL of the REST call
    const restUrl: string = environment.baseUrl + '/api/exceptions/list';

    // Return an observable that (when invoked) returns an array of  ExceptionRecordDTO objects
    return this.httpClient.get <ExceptionRecordDTO[]> (restUrl);
  }
}
