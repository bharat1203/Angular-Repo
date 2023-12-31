import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ForgotPasswordOtpValidationService } from './service/forgot-password-otp-validation.service';
import { ForgotPasswordEmailVerificationComponent } from '../forgot-password-email-verification/forgot-password-email-verification.component';
import { ForgotPasswordEmailVerificationService } from '../forgot-password-email-verification/service/forgot-password-email-verification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password-otp-validation',
  templateUrl: './forgot-password-otp-validation.component.html',
  styleUrls: ['./forgot-password-otp-validation.component.css']
})
export class ForgotPasswordOtpValidationComponent {

  otpCode: number;
  result: number;
  private destroy$: Subject<void> = new Subject<void>();
  email: string = '';
  isValidOtp: boolean = false;
  OtpResponseMessage:string='';

  constructor(private router: Router, private elementRef: ElementRef, 
    private renderer: Renderer2,
    private otpValidationService: ForgotPasswordOtpValidationService,
    private emailVerificationService: ForgotPasswordEmailVerificationService,
    private toastr: ToastrService) {

      this.email = this.router.getCurrentNavigation().extras.state['email']
  }


  ngOnInit() {
    console.log('init-Login')
    $(document).ready(function () {
      $('#emailLabel').hide();
      $('#passwordLabel').hide();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //perform placeholder changing on to the border of textbox
  setupOtpInputPlaceholder(): void {
    const emailInput = this.elementRef.nativeElement.querySelector('#otp');

    // On click, set the placeholder to an empty string
    this.renderer.setAttribute(emailInput, 'placeholder', '');
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#emailLabel'), 'display', 'block');
    this.renderer.addClass(this.elementRef.nativeElement.querySelector('#emailDiv'), 'group');

    // Add a click event listener to the body
    this.renderer.listen('body', 'click', (event: MouseEvent) => {
      if (!emailInput.contains(event.target)) {
        // Execute when the focus is outside the textbox
        this.renderer.setAttribute(emailInput, 'placeholder', 'Enter OTP');
        console.log('Focus is outside the textbox');
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('#emailDiv'), 'group');
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#emailLabel'), 'display', 'none');
      }
    });
  }

  setOtp(event:any){
    this.otpCode = event.target.value;
    if(this.otpCode.toString() === "" ){
       
        this.OtpResponseMessage="";
    }
  }

  resendOtp(){
    this.emailVerificationService.generateOtpForUser(this.email).subscribe(
      (response) => {
        this.result = response;
        console.log(this.result)
        if(this.result > 0){
          console.log('otp has been re-sent to your e-mail '+this.result);
          this.toastr.success("OTP has been sent to your email");
          let navigationExtras: NavigationExtras = {
            state: {
              email: this.email
            }
          }
          this.router.navigate(['/verify-otp'], navigationExtras);
        }else{
          console.log('couldnt generate otp please try again or check your email address')
          this.router.navigateByUrl("/verify-email");
        }
      }
     )
  }
  
  verifyAndValidateOtp() {
    this.isValidOtp = false;
    this.otpValidationService.verifyUserOtp(this.email, this.otpCode)
    .subscribe((response => {
      this.result = response.body;
      if(this.result === 1){
        console.log('valid otp - navigate to reset password page')
        this.isValidOtp = true;
        this.OtpResponseMessage ="valid Otp";

        let navigationExtras: NavigationExtras = {
          state: {
            email: this.email
          }
        }
        this.router.navigateByUrl("/reset-password", navigationExtras)
      }else{
        console.log(' invalid otp please enter a valid one or request for resend otp')
        this.OtpResponseMessage ="Invalid otp";
        let navigationExtras: NavigationExtras = {
          state: {
            email: this.email
          }
        }
        this.router.navigateByUrl("/verify-otp", navigationExtras)
      }
    }))
  }
}
