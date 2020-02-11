import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";

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
    //
    // setTimeout(() => {
    //   // this.invalidLogin=true;
    //   // this.loading = false;
    //   console.log(this.f.username.value)
    //   console.log(this.f.password.value)
    //   // this.router.navigate(['home' ,this.f.username.value ])
    //
    // }, 2000);


    this.loginService.login(this.f.username.value,this.f.password.value).
      subscribe(
        response =>{
          console.log(response)
          this.router.navigate(['/home', this.f.username.value] )
        },
      error =>{
          this.invalidLogin=true;
        console.log("eeeeeeeeeeeeeeeeee"+error)
      }
    )
  }
}
