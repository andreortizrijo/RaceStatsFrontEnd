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
  errorMessage: String = '';

  constructor(private fb: FormBuilder, private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.path.CheckSession(this.router);
    this.initializeForm();
  }

  initializeForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [ Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$") ]],
      username: ['', [ Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{3,32}$") ]],
      password: ['', [ Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{6,}") ]],
      confirmPassword: ['', [ Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{6,}") ]],
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

  InputChecker(property:string) {
    let message = '';

    if(this.signupForm.get(property)?.invalid && (this.signupForm.get(property)?.dirty || this.signupForm.get(property)?.touched)) {
      if(property == 'password'){
        return message = 'Must contain at least 8 characters and must have 1 uppercase, 1 lowercase, 1 number and 1 special character.'
      }

      if(property == 'username'){
        return message = 'Must contain at least 6 characters.'
      }else{
        return message = 'Invalid ' + property + '.'
      };
    };

    return message;
  }

  DisableSignUp() {
    if(this.confirmPassword.value != this.password.value){
      return true;
    }

    return this.signupForm.invalid;
  }

  OnSubmit() {
    var data = this.GenerateJSON();

    this.request.httpPOST('http://127.0.0.1:8000/api-users/register', data ).subscribe(
      (response => {
        console.log(response);
        return this.path.Path(this.router, '/login')
      }),
      (error => {
        for (let key in error.error) {
          this.errorMessage = error.error[key][0];
        };

        return this.errorMessage;
      }),
    );
  }

  SignInPage() {
    this.path.Path(this.router, '/login');
  }
}
