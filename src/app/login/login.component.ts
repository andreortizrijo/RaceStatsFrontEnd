import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../service/requests.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private request: RequestsService, private router: Router) { }

  ngOnInit(): void {
    this.CheckSession();
    this.initializeForm();
  }

  CheckSession() {
    if(localStorage.length > 0) {
      localStorage.getItem('token');
      return this.router.navigate(['/dashboard']);
    }

    if(sessionStorage.length > 0) {
      sessionStorage.getItem('token');
      return this.router.navigate(['/dashboard']);
    };

    return null;
  }

  initializeForm(): void {
    this.signinForm = this.fb.group({
      username: [''],
      password: [''],
      autoLogin: [false],
    });

  }

  get username() { return this.signinForm.get('username')! }
  get password() { return this.signinForm.get('password')! }
  get autoLogin() { return this.signinForm.get('autoLogin')! }

  GenerateJSON() {
    return {
      'username': this.username.value,
      'password': this.password.value,
    };
  }

  Login() {
    var data = this.GenerateJSON();

    console.log(data);

    this.request.httpPOST('http://127.0.0.1:8000/api-users/login', data).subscribe(
      (response) => {
        if(this.autoLogin.value) {
          localStorage.setItem('token', response.body['token']);
        }
        else{
          sessionStorage.setItem('token', response.body['token']);
        };

        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SignUpPage(){
    this.router.navigate(['/signup']);
  }
}
