import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../service/requests.service';
import { SignupModel } from '../models/signup/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signup: SignupModel = new SignupModel();
  agreementCheck: Boolean = false;

  constructor(private request: RequestsService, private router: Router) { }

  ngOnInit(): void {
  }

  SignUp() {
    if(this.signup.confirmPassword != this.signup.password) {
      return console.log('Password is not equal!')
    }

    if(this.agreementCheck == true) {
      this.request.httpPOST('http://127.0.0.1:8000/api-users/register', this.signup).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    console.log('You need to agree with terms!')
  }
}
