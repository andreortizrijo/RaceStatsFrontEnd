import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});
  errList = new Map([]);

  constructor(private fb: FormBuilder, private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.path.CheckSession(this.router);
    this.initializeForm();
  }

  initializeForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      username: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(10) ]],
      password: ['', [ Validators.required, Validators.pattern("") ]],
      confirmPassword: ['', [ Validators.required ]],
    });
  }

  get email() { return this.signupForm.get('email')! }
  get username() { return this.signupForm.get('username')! }
  get password() { return this.signupForm.get('password')! }
  get confirmPassword() { return this.signupForm.get('confirmPassword')! }

  GenerateJSON() {
    return {
      'email': this.email.value,
      'username': this.username.value,
      'password': this.password.value,
    };
  }

  InputChecker(input:any, property:string) {
    if(input.invalid && (input.dirty || input.touched)) {
      return "Invalid " + property + "!";
    };

    if(this.errList.size > 0) {
      return this.errList.get(property)
    }

    return null;
  }

  DisableSignUp() {
    if((this.email.value && this.username.value && this.password.value) == '')
      return true;

    return false;
  }

  OnSubmit() {
    this.errList = new Map([]);

    if(this.password.value != this.confirmPassword.value) {
      return console.log('The passwords doesnt match')
    };

    var data = this.GenerateJSON();

    this.request.httpPOST('http://127.0.0.1:8000/api-users/register', data ).subscribe(
      (response => {
        console.log(response);
        return this.path.Path(this.router, '/login')
      }),
      (error => {
        console.log(error);

        var key;
        for(key in error.error) {
          this.errList.set(key, error.error[key] + '');
        }

        return null;
      }),
    );
  }

  SignInPage() {
    this.path.Path(this.router, '/login');
  }
}
