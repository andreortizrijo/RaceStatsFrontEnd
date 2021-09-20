import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestsService } from '../service/requests.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface TeamInfo {
  id: string;
  name: string;
  members: string;
}

export interface TeamProfile {
  id: string;
  member: string;
}

const ELEMENT_DATA: TeamInfo[] = []
const TEAM_ELEMENTE_DATA: TeamProfile[] = []

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {
  teamForm: FormGroup = new FormGroup({});
  formteam: any = false;
  createteam: any = true;
  hasTeam: any = true;
  ismod: any = false;
  teamname: string = '';
  teamdescription: string = '';
  displayedColumns: string[] = ['name', 'members', 'join'];
  displayedTeamColumns: string[] = ['member', 'kick'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  teamSource = new MatTableDataSource(TEAM_ELEMENTE_DATA);
  length = '';

  @ViewChild('tablelist') data!: MatTable<any>;
  @ViewChild('paginatorlist') paginatorlist!: MatPaginator;

  @ViewChild('teamprofile') team!: MatTable<any>;

  constructor(private request: RequestsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const teamid = this.checkTeam();
    this.checkRank();

    if(teamid == '0'){
      this.getTeam(teamid);
    }else{
      this.getTeamDetail(teamid);
    };

    this.initializeForm();
  }

  initializeForm(): void {
    this.teamForm = this.fb.group({
      teamname: [''],
      teamdescription: [''],
    });
  }

  get teamName() { return this.teamForm.get('teamname')! }
  get teamDescription() { return this.teamForm.get('teamdescription')! }

  generatePayload() {
    return {
      'name': this.teamName.value,
      'description': this.teamDescription.value,
    };
  }

  private getTeam(teamid: any): TeamInfo[] {
    let token = this.getToken();
    var ELEMENT_DATA: TeamInfo[] = [];

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
        this.dataSource.paginator = this.paginatorlist;
        return ELEMENT_DATA;
      },
    )
    return ELEMENT_DATA;
  }

  private getTeamDetail(teamid: any): TeamProfile[] {
    this.hasTeam = false;
    this.createteam = false;
    const token = this.getToken();
    var TEAM_ELEMENT_DATA: TeamProfile[] = [];

    this.request.httpGET('http://127.0.0.1:8000/api-teams/team', {'token':token, 'teamid': teamid}).subscribe(
      (response) => {
        this.teamname = response.body['name'];
        this.teamdescription = response.body['description'];
        if(response.body.members['id'].length != 0){
          for (let i = 0; i < response.body.members['id'].length; i++) {
            var team: TeamProfile = {
              id: response.body.members['id'][i],
              member: response.body.members['name'][i],
            };

            TEAM_ELEMENT_DATA.push(team);
          }
        }else{
          var team: TeamProfile = {
            id: '0',
            member: '-- -- -- --',
          };
          TEAM_ELEMENT_DATA.push(team);
        };

        this.teamSource = new MatTableDataSource(TEAM_ELEMENT_DATA);
        return TEAM_ELEMENT_DATA;
      }
    )
    return TEAM_ELEMENT_DATA;
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

  checkRank() {
    const token = this.getToken();
    const teamid = this.checkTeam();
    this.request.httpGET('http://127.0.0.1:8000/api-users/rank', {'token': token, 'teamid': teamid}).subscribe(
      (response) => {
        this.ismod = response.body
      }
      );

      return false
    }

  kick(memberid: any) {
    this.request.httpPUT('http://127.0.0.1:8000/api-users/leaveteam', {'member': memberid}).subscribe(
      (response) => {

        location.reload();
      }
    )
  }

  leave() {
    const token = this.getToken();
    this.request.httpPUT('http://127.0.0.1:8000/api-users/leaveteam', null, {'token': token}).subscribe(
      (response) => {
        if(localStorage.getItem('team')){
          localStorage.setItem('team', '0');
        }else{
          sessionStorage.setItem('team', '0');
        };
        location.reload();
      }
    )
  }

  addteam() {
    this.createteam = false;
    this.formteam = true;
  }

  foundteam() {
    const data = this.generatePayload();
    const token = this.getToken();

    this.request.httpPOST('http://127.0.0.1:8000/api-teams/team', data, token).subscribe(
      (response) => {
        if(localStorage.getItem('team')){
          localStorage.setItem('team', response.body);
        }else{
          sessionStorage.setItem('team', response.body);
        };
        location.reload();
      }
    );
  }
}
