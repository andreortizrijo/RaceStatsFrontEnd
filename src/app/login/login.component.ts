import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';
import { LoginstatecontrolService } from '../service/loginstatecontrol.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private request: RequestsService, private router: Router, private path: PathsService, private loginstate: LoginstatecontrolService) { }

  ngOnInit(): void {
    this.path.CheckSession(this.router);
    this.initializeForm();
  }

  initializeForm(): void {
    this.signinForm = this.fb.group({
      username: [''],
      password: [''],
      remmemberMe: [false],
    });
  }

  get username() { return this.signinForm.get('username')! }
  get password() { return this.signinForm.get('password')! }
  get remmemberMe() { return this.signinForm.get('remmemberMe')! }

  generatePayload() {
    return {
      'username': this.username.value,
      'password': this.password.value,
    };
  }

  login() {
    var data = this.generatePayload();

    this.request.httpPOST('http://127.0.0.1:8000/api-users/login', data).subscribe(
      (response) => {
        if(this.remmemberMe.value == false) {
          localStorage.setItem('token', response.body);
          localStorage.setItem('islogin', 'true');
          localStorage.setItem('name', data.username);
        }
        else{
          sessionStorage.setItem('token', response.body);
          sessionStorage.setItem('islogin', 'true');
          sessionStorage.setItem('name', data.username);
        };

        this.loginstate.emit(true);
        this.path.Path(this.router, '/dashboard');

        return true;
      },
      (error) => {
        return error.error
      }
    );
  }

  signUpPage(){
    this.path.Path(this.router, '/signup');
  }
}
