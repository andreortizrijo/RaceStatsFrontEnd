import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  token: any;

  constructor(private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.path.CheckSession(this.router);
    this.getUserInfo();
  }

  getUserInfo() {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = sessionStorage.getItem('token');
    }

    this.request.httpGET('http://127.0.0.1:8000/api-users/user', this.token).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onclick(){
    this.request.httpPOST('http://127.0.0.1:8000/api-users/logout', '').subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        this.path.Path(this.router, '/login');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
