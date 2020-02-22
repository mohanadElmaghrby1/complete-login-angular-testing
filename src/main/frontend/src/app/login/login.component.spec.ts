import { async, ComponentFixture, TestBed ,fakeAsync ,tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginService} from "../services/login.service";
import {DebugElement} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HomeComponent} from "../home/home.component";
import {By} from "@angular/platform-browser";
import {Observable , of} from "rxjs";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const testUserData = { id: 2, firstname: 'mohannad', lastname: 'elmaghrby'};

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let loginService : LoginService
//   let debugElement : DebugElement
//   let loginspy : any
//
//   let routerSpy :any
//
//   beforeEach(async(() => {
//     loginspy = jasmine.createSpyObj('LoginService' , ['login']);
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, FormsModule,AppRoutingModule],
//       declarations: [ LoginComponent , HomeComponent ],
//       providers: [
//         {provide: LoginService, useValue: loginspy}
//       ]
//     })
//     .compileComponents().then(()=>{
//       fixture = TestBed.createComponent(LoginComponent);
//       component = fixture.componentInstance;
//       loginService = TestBed.get(LoginService)
//       fixture.detectChanges();
//       debugElement = fixture.debugElement
//     });
//   }));
//
//
//   it('should create the loginComponent', () => {
//     expect(component).toBeTruthy();
//     // console.log(component)
//   });
//
//   it('should show username', function () {
//     component.loginForm.controls['username'].setValue('abcd');
//     fixture.detectChanges();
//     expect(component.loginForm.controls['username'].value).toBe('abcd')
//   });
//
//   it('should display alert message fo empty password', function () {
//     //setting user name value
//     component.loginForm.controls['username'].setValue('abc');
//     //detect changes
//     fixture.detectChanges()
//
//     //simulate the login button clicked
//     component.submitted= true;
//     fixture.detectChanges()
//
//     //get the invalid-feedback from the dom and make sure that only one displayed
//     const alertMessages = debugElement.queryAll(By.css('.invalid-feedback'));
//
//     //make sure that only one alert for password()
//     expect(alertMessages.length).toBe(1,'unexpected number of alert messages')
//
//   });
//
//   it('should display two alert messages for empty password and username', function () {
//
//     // component.loginForm.controls['username'].setValue('abcd');
//     //simulate that login button clicked
//     component.submitted=true;
//     fixture.detectChanges()
//
//     //log all generated html
//     console.log(debugElement.nativeElement.outerHTML)
//     //log the component object
//     console.log(component)
//
//     // fixture.whenStable().then(() =>{
//       // expect(loginService.login).toHaveBeenCalled();
//       const alertDiv = debugElement.queryAll(By.css('.invalid-feedback'))
//       console.log(alertDiv.length)
//       expect(alertDiv.length).toBe(2)
//     // })
//   });
//
//
//   it('loginService login() should called ', fakeAsync(() => {
//     updateForm('ahmed', 'abcd');
//     //simulate that login button clicked
//     // component.submitted=true;
//     // fixture.detectChanges();
//     const button = fixture.debugElement.nativeElement.querySelector('button');
//     button.click();
//     fixture.detectChanges();
//
//     expect(loginService.login).toHaveBeenCalled();
//   }));
//
//   // it('should route to home if login successfully', fakeAsync(() => {
//   //   updateForm('mohannad', 'elmaghrby');
//   //   fixture.detectChanges();
//   //   const button = fixture.debugElement.nativeElement.querySelector('button');
//   //   button.click();
//   //   advance(fixture);
//   //
//   //   spyOn(loginService, 'login').and.returnValue(of(testUserData));
//   //   advance(fixture);
//   //
//   //   expect(routerSpy.navigate).toHaveBeenCalled();
//   //   // const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
//   //   // // expecting to navigate to id of the component's first hero
//   //   // expect(navArgs).toBe('/home', 'should nav to Home Page');
//   // }));
//
//   function advance(f: ComponentFixture<any>) {
//     tick();
//     f.detectChanges();
//   }
//
//   function updateForm(userEmail, userPassword) {
//     component.loginForm.controls['username'].setValue(userEmail);
//     component.loginForm.controls['password'].setValue(userPassword);
//   }
//
// });



const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

describe('Login Component Integrated Test', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;
  let routerSpy
  let loginService: LoginService
  let component:LoginComponent;
  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       ReactiveFormsModule,
  //       FormsModule,
  //       RouterTestingModule
  //     ],
  //
  //     //       imports: [ReactiveFormsModule, FormsModule,AppRoutingModule],
  //
  //     providers: [
  //       {provide: LoginService, useValue: loginServiceSpy},
  //       FormBuilder
  //     ],
  //     declarations: [LoginComponent , HomeComponent],
  //   }).compileComponents();
  //
  //   fixture = TestBed.createComponent(LoginComponent);
  //   // router = TestBed.get(Router);
  //   component = fixture.componentInstance;
  //   loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));
  //
  // }));
  let debugElement;

  beforeEach(async(() => {
    loginSpy = jasmine.createSpyObj('LoginService' , ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,AppRoutingModule],
      declarations: [ LoginComponent , HomeComponent ],
      providers: [
        {provide: LoginService, useValue: loginSpy}
      ]
    })
      .compileComponents().then(()=>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      loginService = TestBed.get(LoginService)
      fixture.detectChanges();
      debugElement = fixture.debugElement
    });
  }));


  it('should create logincomponent', function () {
    expect(component).toBeTruthy("couldnt create login component")
    console.log(component.loginForm)

  });

  it('loginService login() should called ', fakeAsync(() => {
    updateForm('abc', 'abcd');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click()
    fixture.detectChanges();
    console.log(component.submitted)
    console.log('trying'+component.loginForm)
    expect(loginServiceSpy.login).toHaveBeenCalled();
  }));

  // it('should route to home if login successfully', fakeAsync(() => {
  //   updateForm('abc', 'abcd');
  //   fixture.detectChanges();
  //   const button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.click();
  //   advance(fixture);
  //
  //   loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));
  //   advance(fixture);
  //
  //   expect(routerSpy.navigate).toHaveBeenCalled();
  //   const navArgs = routerSpy.navigate.calls.first().args[0];
  //   // expecting to navigate to id of the component's first hero
  //   expect(navArgs).toBe('/home', 'should nav to Home Page');
  // }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});