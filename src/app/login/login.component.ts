import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.css']
})
export class LoginComponent {
  title = 'ums-ui';
  constructor(private route:Router) {

  }
   navigate(){
    console.log("saasdasdas");
    this.route.navigate(["/home"]);
  }
}
