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
            borderColor: 'rgb(20, 22, 64)',
            borderWidth: 1,
            tension: 0.1,
            yAxisID: 'y',
          },
          {
            type: 'line',
            label: 'SPEED KMH',
            data: data.speedkmh,
            borderColor: 'rgb(20, 22, 64)',
            borderWidth: 1,
            yAxisID: 'y2',
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
          y: {
            position: 'left',
            stack: 'demo',
            stackWeight: 2,
            grid: {
            }
          },
          y2: {
            offset: true,
            position: 'left',
            stack: 'demo',
            stackWeight: 1,
            grid: {
            }
          },
        }
      },
    });

    this.chart.update();
  }

  updateData() {
    var item: any;
    const rpm: any[] = [];
    const speedkmh: any[] = [];
    const label: any[] = [];
    let header = { token: this.getToken() };

    this.request.httpGET('http://127.0.0.1:8000/api-datahandler/live', header).subscribe(
      (response) => {
        for (item in response.body) {
          label.push('TIMESTAMP');
          rpm.push(response.body[item].rpm);
          speedkmh.push(response.body[item].speedkmh);
        };

        this.chartIt({label, rpm, speedkmh});
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
