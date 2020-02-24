import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginCredentials} from "../login/loginCredentials.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  login(loginCredentials :LoginCredentials) {
    return this.http.post(`http://localhost:8080/login`,loginCredentials)
  }

}
