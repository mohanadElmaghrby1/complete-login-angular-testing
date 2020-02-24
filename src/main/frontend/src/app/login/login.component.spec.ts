import { async, ComponentFixture, TestBed ,fakeAsync ,tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginService} from "../services/login.service";
import {DebugElement} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HomeComponent} from "../home/home.component";
import {By} from "@angular/platform-browser";

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


  it('should create loginComponent', function () {
    expect(component).toBeTruthy("couldnt create login component")
    console.log(component.loginForm)

  });

  it('should display alert message for invalid username or password', function () {
    //setting user name value
    component.loginForm.controls['username'].setValue('abc@gmail.com');
    component.loginForm.controls['password'].setValue('abc');
    //detect changes
    fixture.detectChanges()

    //simulate the login button clicked
    component.submitted= true;

    //simulate invalid login
    component.invalidLogin=true;

    fixture.detectChanges()

    //get the invalid-feedback from the dom and make sure that only one displayed
    const alertMessages = debugElement.queryAll(By.css('.alert-danger'));

    //make sure that only one alert for password()
    expect(alertMessages.length).toBe(1,'No Alert message displayed')

  });

  it('should display alert message fo empty password', function () {
    //setting user name value
    component.loginForm.controls['username'].setValue('abc');
    //detect changes
    fixture.detectChanges()

    //simulate the login button clicked
    component.submitted= true;
    fixture.detectChanges()

    //get the invalid-feedback from the dom and make sure that only one displayed
    const alertMessages = debugElement.queryAll(By.css('.invalid-feedback'));

    //make sure that only one alert for password()
    expect(alertMessages.length).toBe(1,'unexpected number of alert messages')

  });

  it('should display two alert messages for empty password and username', function () {
    // component.loginForm.controls['username'].setValue('abcd');
    //simulate that login button clicked
    component.submitted=true;
    fixture.detectChanges()

    //log all generated html
    console.log(debugElement.nativeElement.outerHTML)
    //log the component object
    console.log(component)

    // fixture.whenStable().then(() =>{
      // expect(loginService.login).toHaveBeenCalled();
      const alertDiv = debugElement.queryAll(By.css('.invalid-feedback'))
      console.log(alertDiv.length)
      expect(alertDiv.length).toBe(2)
    // })
  });

});
