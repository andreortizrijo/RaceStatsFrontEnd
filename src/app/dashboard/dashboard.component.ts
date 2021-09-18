import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PathsService } from '../service/paths.service';
import { RequestsService } from '../service/requests.service';
import { RecorddetailService } from '../service/recorddetail.service'

export interface RecordInfo {
  number: string;
  track: string;
  trackconfiguration: string;
  carmodel: string;
  besttime: string;
}

const ELEMENT_DATA: RecordInfo[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['number', 'track', 'trackconfiguration', 'carmodel', 'besttime'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  length = '';

  @ViewChild('table') data!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private request: RequestsService, private router: Router, private path: PathsService, private recorddata: RecorddetailService) { }

  ngOnInit(): void {
    this.path.CheckSession(this.router);
    this.getRecordInfo();
  };

  private getRecordInfo(): RecordInfo[] {
    let token = this.getToken();
    var ELEMENT_DATA: RecordInfo[] = [];
    var item:any;

    this.request.httpGET('http://127.0.0.1:8000/api-datahandler/record', {'token':token}).subscribe(
      (response) => {
        if(response.body.length != 0){
          for(item in response.body){
            var data: RecordInfo = {
              number: response.body[item].number,
              track: response.body[item].track,
              trackconfiguration: response.body[item].trackconfiguration,
              carmodel: response.body[item].carmodel,
              besttime: response.body[item].besttime
            };

            ELEMENT_DATA.push(data);
          };
        }else{
          var data: RecordInfo = {
            number: '0',
            track: '-- -- -- -- -- -- -- -- --',
            trackconfiguration: '-- -- -- -- -- -- -- -- --',
            carmodel: '-- -- -- -- -- -- -- -- --',
            besttime: '-- -- -- -- -- -- -- -- --'
          };

          ELEMENT_DATA.push(data);
        }

        this.length = String(ELEMENT_DATA.length);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        return ELEMENT_DATA;
      }
    );
    return ELEMENT_DATA;
  };

  getToken() {
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }else{
      return sessionStorage.getItem('token');
    }
  };

  onClickRow(id:any){
    this.path.RecordPath(this.router, '/detail', id);
  }
}
