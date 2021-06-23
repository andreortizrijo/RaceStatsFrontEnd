import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginstatecontrolService } from '../service/loginstatecontrol.service';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin: any = false;
  constructor(private loginstate: LoginstatecontrolService, private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.loginstate.observer.subscribe( data => {
      this.isLogin = data;
    })
  }

  logout(){
    let token = this.getToken()
    this.request.httpPOST('http://127.0.0.1:8000/api-users/logout', '', token).subscribe(
      (response) => {
        console.log(response);

        if(localStorage.getItem('token')){
          localStorage.removeItem('token');
        }else{
          sessionStorage.removeItem('token');
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
}
