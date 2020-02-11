import { async, ComponentFixture, TestBed ,fakeAsync ,tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginService} from "../services/login.service";
import {DebugElement} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HomeComponent} from "../home/home.component";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService : LoginService
  let debugElement : DebugElement
  let loginspy : any

  const testUserData = { id: 2, firstname: 'mohannad', lastname: 'elmaghrby'};

  beforeEach(async(() => {
    loginspy = jasmine.createSpyObj('LoginService' , ['login']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,AppRoutingModule],
      declarations: [ LoginComponent , HomeComponent ],
      providers: [
        {provide: LoginService, useValue: loginspy}
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


  it('should create the loginComponent', () => {
    expect(component).toBeTruthy();
    // console.log(component)
  });

  it('should show username', function () {
    component.loginForm.controls['username'].setValue('abcd');
    fixture.detectChanges();
    expect(component.loginForm.controls['username'].value).toBe('abcd')
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


  it('loginService login() should called ', fakeAsync(() => {
    updateForm('ahmed', 'abcd');
    //simulate that login button clicked
    // component.submitted=true;
    // fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(loginService.login).toHaveBeenCalled();
  }));

  it('should route to home if login successfully', fakeAsync(() => {
    updateForm('mohannad', 'elmaghrby');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    advance(fixture);

    spyOn(loginService, 'login').and.returnValue(Observable.of);
    advance(fixture);

    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
    // expecting to navigate to id of the component's first hero
    expect(navArgs).toBe('/home', 'should nav to Home Page');
  }));

  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

});
