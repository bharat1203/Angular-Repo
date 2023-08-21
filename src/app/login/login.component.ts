import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { LoginService } from './service/login.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  
  email: string = ''
  password: string = ''
  accessToken: String = null;

  loginInfo = {
    token: '',
    userId: '',
    userRole: '',
    firstName: '',
    lastName:'',
    email:'',
  }

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private elementRef: ElementRef, private renderer: Renderer2,
    @Inject(LoginService) private loginService: LoginService) {
  }

  ngOnInit() {
    console.log(this.router.url);
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#emailLabel'), 'display', 'none');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#passwordLabel'), 'display', 'none');
    // $(document).ready(function () {
    //   $('#emailLabel').hide();
    //   $('#passwordLabel').hide();
    // });
  }

  login(){
    var user = {
      email:this.email,
      password:this.password
    }
    this.loginService.logUserIfValid(user).subscribe(
      response => {
        this.loginInfo.token = response.headers.get('token')
        this.loginInfo.userId = response.headers.get('userId')
        this.loginInfo.userRole = response.headers.get('userRole')
        this.loginInfo.firstName = response.headers.get('firstName')
        this.loginInfo.lastName = response.headers.get('lastName')
        this.loginInfo.email = response.headers.get('email')
      }
    )
    let navigationExtras: NavigationExtras = {
      state: {
        loginInfo: this.loginInfo
      }
    }
    console.log(this.loginInfo)
    this.router.navigate(['/home'], navigationExtras);
  }
  // navigateToUmsHomePage(){
  //   this.router.navigateByUrl("/home");
  // }


  navigateToForgotPassword() {
    this.router.navigateByUrl("/forgot-password");
    //this.setupEmailInputPlaceholder();
  }


  setupEmailInputPlaceholder(): void {
    const emailInput = this.elementRef.nativeElement.querySelector('#email');

    // On click, set the placeholder to an empty string
    this.renderer.setAttribute(emailInput, 'placeholder', '');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#emailLabel'), 'display', 'block');
    this.renderer.addClass(this.elementRef.nativeElement.querySelector('#emailDiv'), 'group');

    // Add a click event listener to the body
    this.renderer.listen('body', 'click', (event: MouseEvent) => {
      if (!emailInput.contains(event.target)) {
        // Execute when the focus is outside the textbox
        this.renderer.setAttribute(emailInput, 'placeholder', 'Email Id');
        console.log('Focus is outside the textbox');
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('#emailDiv'), 'group');
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#emailLabel'), 'display', 'none');
      }
    });
  }

  setupPasswordInputPlaceholder() {
    const passwordInput = this.elementRef.nativeElement.querySelector('#password');

    // On click, set the placeholder to an empty string
    this.renderer.setAttribute(passwordInput, 'placeholder', '');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#passwordLabel'), 'display', 'block');
    this.renderer.addClass(this.elementRef.nativeElement.querySelector('#passwordDiv'), 'group');

    // Add a click event listener to the body
    this.renderer.listen('body', 'click', (event: MouseEvent) => {
      if (!passwordInput.contains(event.target)) {
        // Execute when the focus is outside the textbox
        this.renderer.setAttribute(passwordInput, 'placeholder', 'Password');
        console.log('Focus is outside the textbox');
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('#passwordDiv'), 'group');
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#passwordLabel'), 'display', 'none');
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}



