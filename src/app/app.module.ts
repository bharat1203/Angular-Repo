import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UmsLogoComponent } from './ums-logo/ums-logo.component';
import * as $ from 'jquery';
import { ForgotPasswordEmailVerificationComponent } from './forgot-password-email-verification/forgot-password-email-verification.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordOtpValidationComponent } from './forgot-password-otp-validation/forgot-password-otp-validation.component';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';
import { LoginNavbarComponent } from './login-navbar/login-navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidemenuBarComponent } from './sidemenu-bar/sidemenu-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UmsLogoComponent,
    ForgotPasswordEmailVerificationComponent,
    ForgotPasswordOtpValidationComponent,
    ForgotPasswordResetComponent,
    LoginNavbarComponent,
    SidemenuBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
