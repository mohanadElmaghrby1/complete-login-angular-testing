import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    
  }

  login(username, password) {
    return this.http.get(`http://localhost:8090/api/login?email={username}`)
  }

}
