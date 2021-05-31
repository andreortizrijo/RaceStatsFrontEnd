import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../service/requests.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private request: RequestsService, private router: Router) { }

  ngOnInit(): void {
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

  get email() { return this.signupForm.get('email')! as FormControl; }
  get username() { return this.signupForm.get('username')!}
  get password() { return this.signupForm.get('password')! }
  get confirmPassword() { return this.signupForm.get('confirmPassword')! }

  onSubmit() {
    console.log(this.signupForm);
  }

  SignUp() {
    /*if(this.signup.confirmPassword != this.signup.password) {
      return console.log('Password is not equal!')
    }

    this.request.httpPOST('http://127.0.0.1:8000/api-users/register', this.signup).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );*/
  }

  SignInPage() {
    this.router.navigate(['/login']);
  }
}
