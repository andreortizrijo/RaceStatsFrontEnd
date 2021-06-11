import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    //this.path.CheckSession(this.router);
    this.initializeForm();
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

        this.path.Path(this.router, '/dashboard');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SignUpPage(){
    this.path.Path(this.router, '/signup');
  }
}
