import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestsService } from '../service/requests.service';
import { RecorddetailService } from '../service/recorddetail.service';
import { ActivatedRoute } from '@angular/router';

export interface RecordData {
  model: string;
  sponser: string;
  tyrecompound: string;
}

const ELEMENT_DATA: RecordData[] = [];

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  displayedColumns: string[] = ['model', 'sponser', 'tyrecompound'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  length = '';
  id:any;

  @ViewChild('table') data!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private request: RequestsService, private recorddata: ActivatedRoute) { }

  ngOnInit(): void {
    this.recorddata.params.subscribe( params => {
      this.id = params;
    });

    this.getRecordInfo();
  };

  private getRecordInfo(): RecordData[] {
    console.log('FUNC')
    var ELEMENT_DATA: RecordData[] = [];
    var item:any;

    this.request.httpGET('http://127.0.0.1:8000/api-datahandler/recorddata', {'session':this.id['id']}).subscribe(
      (response) => {
        console.log(response);

        //if(response.body.length != 0){
          for(item in response.body){
            var data: RecordData = {
              model: response.body[item].model,
              sponser: response.body[item].sponser,
              tyrecompound: response.body[item].tyrecompound
            };

            ELEMENT_DATA.push(data);
          };
        //}

        this.length = String(ELEMENT_DATA.length);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.data.renderRows();
        return ELEMENT_DATA;
      },
      error => {
        console.log(error)
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
}
