import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';

export interface RecordInfo {
  number: string;
  track: string;
  trackconfiguration: string;
  carmodel: string;
  besttime: string;
}

const ELEMENT_DATA: RecordInfo[] = [
  {number: '1', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '2', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '3', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '4', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '5', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '6', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '7', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '8', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '9', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '10', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
  {number: '11', track: 'Hydrogen', trackconfiguration: '---', carmodel: 'H', besttime: '02:20.654'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['number', 'track', 'trackconfiguration', 'carmodel', 'besttime'];
  dataSource = new MatTableDataSource<RecordInfo>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.path.CheckSession(this.router);
    this.getUserInfo();
    this.dataSource.paginator = this.paginator;
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
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }else{
      return sessionStorage.getItem('token');
    }
  };
}
