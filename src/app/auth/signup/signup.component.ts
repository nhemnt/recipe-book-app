import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private  authService: AuthService) { }

  ngOnInit() {
  }
  onSignup(form: FormGroup) {
    const email = form.value.email;
    const password = form.value.password;
    // console.log(`${email} and ${password}`);
    this.authService.signupUser(email, password);
  }
}
