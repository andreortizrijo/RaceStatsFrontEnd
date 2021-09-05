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
  chartcontext: any;
  chart: any;

  updateInterval = 20

  @ViewChild('chartelement') chartelement!: any;

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

  chartIt(data: any) {
    this.chart = new Chart(this.chartcontext, {
      type: 'line',
      data: {
        labels: data.label, //Change to Timestamp
        datasets: [
          {
            type: 'line',
            label: 'RPM',
            data: data.rpm,
            borderColor: 'rgb(191, 42, 171)',
            borderWidth: 1,
            tension: 0.1,
            yAxisID: 'rpm',
          },
          {
            type: 'line',
            label: 'VELOCITY',
            data: data.speedkmh,
            borderColor: 'rgb(20, 22, 64)',
            borderWidth: 1,
            yAxisID: 'velocity',
          },
          {
            type: 'line',
            label: 'GEAR',
            data: data.gear,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1,
            stepped: true,
            yAxisID: 'gear',
          },
          {
            type: 'bar',
            label: 'GAS PEDAL',
            data: data.gaspedal,
            borderColor: 'rgb(42, 191, 54)',
            borderWidth: 1,
            yAxisID: 'pedals',
          },
          {
            type: 'bar',
            label: 'BRAKE PEDAL',
            data: data.brakepedal,
            borderColor: 'rgb(191, 42, 55)',
            borderWidth: 1,
            yAxisID: 'pedals',
          },
          {
            type: 'bar',
            label: 'STEER ANGLE',
            data: data.steerangle,
            borderColor: 'rgb(191, 102, 42)',
            borderWidth: 1,
            yAxisID: 'others',
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Live Graphic',
          },
        },
        scales: {
          rpm: {
            position: 'left',
            stack: 'demo',
            stackWeight: 2,
            grid: {
            }
          },
          velocity: {
            position: 'left',
            stack: 'demo',
            stackWeight: 2,
            grid: {
            }
          },
          others: {
            offset: true,
            position: 'left',
            stack: 'demo',
            stackWeight: 1,
            grid: {
            }
          },
          gear: {
            offset: true,
            position: 'left',
            stack: 'demo',
            stackWeight: 1,
            grid: {
            }
          },
          pedals: {
            offset: true,
            position: 'left',
            stack: 'demo',
            stackWeight: 1,
            grid: {
            }
          },
        },
      },
    });

    this.chart.update();
  }

  updateData() {
    var item: any;
    const label: any[] = [];
    const rpm: any[] = [];
    const speedkmh: any[] = [];
    const gear: any[] = [];
    const gaspedal: any[] = [];
    const brakepedal: any[] = [];
    const steerangle: any[] = [];
    let header = { token: this.getToken() };

    this.request.httpGET('http://127.0.0.1:8000/api-datahandler/live', header).subscribe(
      (response) => {
        for (item in response.body) {
          label.push(response.body[item].timestamp);
          rpm.push(response.body[item].rpm);
          speedkmh.push(response.body[item].speedkmh);
          gear.push(response.body[item].gear);
          gaspedal.push(response.body[item].gaspedal);
          brakepedal.push(response.body[item].brakepedal);
          steerangle.push(response.body[item].steerangle);

          setTimeout(() => {
            this.chartIt({label, rpm, speedkmh, gear, gaspedal, brakepedal, steerangle});
          }, 1000);
        };

      },
      (error) => {
        console.log('Graph Data Collector Error!');
      }
    );
  }

  ngAfterViewInit() {
    this.chartcontext = this.chartelement.nativeElement.getContext('2d');
    this.updateData();
  }
}
