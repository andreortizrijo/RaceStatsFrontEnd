import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../service/requests.service';
import { SigninModel } from '../models/signin/signin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signin: SigninModel = new SigninModel();
  autoLogin: Boolean = false;

  constructor(private request: RequestsService, private router: Router) { }

  ngOnInit(): void {
  }

  SignIn() {
    this.request.httpPOST('http://127.0.0.1:8000/api-users/login', this.signin).subscribe(
      (response) => {
        if(this.autoLogin) {
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

  SignUp(){
    this.router.navigate(['/signup']);
  }
}
