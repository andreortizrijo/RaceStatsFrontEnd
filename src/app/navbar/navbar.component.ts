import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginstatecontrolService } from '../service/loginstatecontrol.service';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin: any = false;
  username: any = '';
  constructor(private loginstate: LoginstatecontrolService, private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.loginState()
    this.loginstate.observer.subscribe( data => {
      this.isLogin = data;
      this.username = data;
    })
  }

  ngAfterViewInit(): void {
    this.loginState()
    this.loginstate.observer.subscribe( data => {
      this.isLogin = data;
    })
  }

  loginState(){
    if(localStorage.getItem('islogin')){
      this.isLogin = true;
      this.username = localStorage.getItem('name')?.toUpperCase()
    };

    if(sessionStorage.getItem('islogin')){
      this.isLogin = true;
      this.username = sessionStorage.getItem('name')?.toUpperCase()
    };
  }

  logout(){
    let token = this.getToken()
    this.request.httpPOST('http://127.0.0.1:8000/api-users/logout', '', token).subscribe(
      (response) => {
        console.log(response);

        if(localStorage.getItem('token')){
          localStorage.removeItem('token');
          localStorage.removeItem('islogin');
          localStorage.removeItem('name');
          localStorage.removeItem('team');
        }else{
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('islogin');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('team');
        }

        this.loginstate.emit(false);
        this.path.Path(this.router, '/login');
      },
      (error) => {
        return error.error
      }
    );
  }

  getToken(){
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }else{
      return sessionStorage.getItem('token');
    }
  };

  donwloadConfigFile(){
    let token = this.getToken();

    this.request.httpGET('http://127.0.0.1:8000/api-users/download', {'token':token}).subscribe(
      response => {
        console.log(response.body);
        //var file = new File([error.error.text], 'config.ini', {type: "text/plain;charset=utf-8"});
        //FileSaver.saveAs(file);
      },
      error => {
        var file = new File([error.error.text], 'config.ini', {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);
      }
    );
  }
}
