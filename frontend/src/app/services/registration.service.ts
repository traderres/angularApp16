import { Injectable } from '@angular/core';
import {RegisterUserDTO} from "../models/register-user-dto";
import {delay, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  public registerUser(aDTO: RegisterUserDTO) : Observable<string> {
    const restUrl: string = environment.baseUrl + '/api/register/user';

    return this.httpClient.post <string> (restUrl, aDTO).pipe(delay(5000));
  }
}
