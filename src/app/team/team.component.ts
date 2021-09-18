import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginstatecontrolService } from '../service/loginstatecontrol.service';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';

export interface TeamInfo {
  id: string;
  name: string;
  members: string;
}

const ELEMENT_DATA: TeamInfo[] = []

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {
  hasTeam: any = true;
  displayedColumns: string[] = ['name', 'members', 'join'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  length = '';

  @ViewChild('table') data!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private loginstate: LoginstatecontrolService, private request: RequestsService, private router: Router, private path: PathsService) { }

  ngOnInit(): void {
    this.getTeam();
  }

  private getTeam(): TeamInfo[] {
    let token = this.getToken();
    const teamid = this.checkTeam();
    var ELEMENT_DATA: TeamInfo[] = [];

    if(teamid == '0'){
      this.request.httpGET('http://127.0.0.1:8000/api-teams/team', {'token':token, 'teamid': teamid}).subscribe(
        (response) => {
          if(response.body.length != 0){
            for(let item in response.body){
              var data: TeamInfo = {
                id: response.body[item].id,
                name: response.body[item].name,
                members: response.body[item].members,
              };
              ELEMENT_DATA.push(data);
            };
          }else{
            var data: TeamInfo = {
              id: '0',
              name: '-- -- -- --',
              members: '0',
            };
            ELEMENT_DATA.push(data);
          };

          this.length = String(ELEMENT_DATA.length);
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          return ELEMENT_DATA;
        },
      )
      return ELEMENT_DATA;
    };

    this.getTeamDetail();
    return [];
  }

  private getToken() {
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }else{
      return sessionStorage.getItem('token');
    }
  };

  private checkTeam() {
    if(localStorage.getItem('team')){
      return localStorage.getItem('team');
    }else{
      return sessionStorage.getItem('team');
    };
  };

  private getTeamDetail() {
    this.hasTeam = false;
    const token = this.getToken();
    const teamid = this.checkTeam();
    this.request.httpGET('http://127.0.0.1:8000/api-teams/team', {'token':token, 'teamid': teamid}).subscribe(
      (response) => {
        console.log(response.body)
        return response.body;
      }
      )
    }

  jointeam(teamid: any){
    const token = this.getToken();

    this.request.httpPUT('http://127.0.0.1:8000/api-users/jointeam', {'teamid': teamid}, { 'token': token }).subscribe(
      (response) => {
        if(localStorage.getItem('team') == '0'){
          localStorage.setItem('team', response.body);
        }else{
          sessionStorage.setItem('team', response.body);
        };

        location.reload();
      }
    );
  }
}
