import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  info = {}
  username: string = '';
  password: string = '';
  url = 'http://127.0.0.1:8000/api-users/login'

  onClick() {
    this.info = {
      'username':this.username,
      'password':this.password,
    };

    this.http.post(this.url, this.info);
  }

}
