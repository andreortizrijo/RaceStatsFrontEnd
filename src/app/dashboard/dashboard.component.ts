import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';
import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  myChart:any = [];

  constructor(private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.path.CheckSession(this.router);
    //this.getUserInfo();

    this.myChart = {
      labels: 'AAAAAAAAAAA',
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  };

  getUserInfo() {
    let token = this.getToken()
    this.request.httpGET('http://127.0.0.1:8000/api-users/user', token).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
      );
  };

  getToken(){
    let token: any;

    if(localStorage.getItem('token')){
      return token = localStorage.getItem('token');
    }else{
      return token = sessionStorage.getItem('token');
    }
  };
}
