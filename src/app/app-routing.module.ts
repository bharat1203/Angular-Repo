import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordEmailVerificationComponent } from './forgot-password-email-verification/forgot-password-email-verification.component';
import { ForgotPasswordOtpValidationComponent } from './forgot-password-otp-validation/forgot-password-otp-validation.component';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';
import { SidemenuBarComponent } from './sidemenu-bar/sidemenu-bar.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"verify-email", component:ForgotPasswordEmailVerificationComponent},
  {path:"verify-otp", component: ForgotPasswordOtpValidationComponent},
  {path:"reset-password", component: ForgotPasswordResetComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: 'sidemenu',component:SidemenuBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
