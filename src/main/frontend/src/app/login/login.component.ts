import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {User} from "./user.model";
import {LoginCredentials} from "./loginCredentials.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  invalidLogin = false;

  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.loginService.login(new LoginCredentials(this.f.username.value,this.f.password.value)).
      subscribe(
      (user :User) =>{
          console.log(user.firstName)
          this.loading=false;
          this.router.navigate(['/home', user.firstName+" "+user.lastName] )
        },
      (error) =>{
          this.invalidLogin=true;
          this.loading=false;
        console.log(error)
      }
    )
  }
}
