import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { RequestsService } from '../service/requests.service';

@Component({
  selector: 'app-livegraph',
  templateUrl: './livegraph.component.html',
  styleUrls: ['./livegraph.component.scss'],
})
export class LivegraphComponent implements OnInit {
  speedcontext: any;
  speed: any;
  gearcontext: any;
  gear: any;

  @ViewChild('speedchart') speedchart!: any;
  @ViewChild('gearchart') gearchart!: any;

  slabels: string[] = [];
  sdataSource: any[] = [];

  glabels: string[] = [];
  gdataSource: any[] = [];

  geardata = {
    labels: this.glabels,
    datasets: [
      {
        label: 'GEAR',
        data: this.gdataSource,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
    responsive: true,
    maintainAspectRatio: false,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  speeddata = {
    labels: this.slabels,
    datasets: [
      {
        label: 'SPEED IN KMH',
        data: this.sdataSource,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 5,
        tension: 0.1,
      },
    ],
    responsive: true,
    maintainAspectRatio: false,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  constructor(private request: RequestsService) {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    );
  }

  ngOnInit(): void {}

  getToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return sessionStorage.getItem('token');
    }
  }

  getRecordInfo(): any {
    var item: any;
    let header = {
      token: this.getToken(),
      session: '8',
    };

    this.request
      .httpGET('http://127.0.0.1:8000/api-datahandler/car', header)
      .subscribe((response) => {
        for (item in response.body) {
          this.slabels.push('RPM');
          this.sdataSource.push(parseFloat(response.body[item].rpm));
          this.glabels.push('GEAR');
          this.gdataSource.push(parseFloat(response.body[item].gear));
        }
      });
  }

  ngAfterViewInit() {
    this.speedcontext = this.speedchart.nativeElement.getContext('2d');
    this.gearcontext = this.gearchart.nativeElement.getContext('2d');

    this.getRecordInfo();
    this.speed = new Chart(this.speedcontext, {
      type: 'line',
      data: this.speeddata,
    });

    this.gear = new Chart(this.gearcontext, {
      type: 'bar',
      data: this.geardata,
    });
  }
}
