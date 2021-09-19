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

  interval: any;
  chartcontext: any;
  chart: any;

  updateInterval = 5000

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

  chartIt() {
    this.chart = new Chart(this.chartcontext, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            type: 'line',
            label: 'RPM',
            data: [],
            borderColor: 'rgb(191, 42, 171)',
            borderWidth: 1,
            tension: 0.1,
            yAxisID: 'rpm',
          },
          {
            type: 'line',
            label: 'VELOCITY',
            data: [],
            borderColor: 'rgb(20, 22, 64)',
            borderWidth: 1,
            yAxisID: 'velocity',
          },
          {
            type: 'line',
            label: 'GEAR',
            data: [],
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1,
            stepped: true,
            yAxisID: 'gear',
          },
          {
            type: 'bar',
            label: 'GAS PEDAL',
            data: [],
            borderColor: 'rgb(42, 191, 54)',
            borderWidth: 1,
            yAxisID: 'pedals',
          },
          {
            type: 'bar',
            label: 'BRAKE PEDAL',
            data: [],
            borderColor: 'rgb(191, 42, 55)',
            borderWidth: 1,
            yAxisID: 'pedals',
          },
          {
            type: 'bar',
            label: 'STEER ANGLE',
            data: [],
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
  };

      // console.log(this.graphproperties);
      //     this.chart.data.labels.push(response.body[item].timestamp);
      //     this.chart.data.datasets[0].data.push(response.body[item].rpm);
      //     this.chart.data.datasets[1].data.push(response.body[item].speedkmh);
      //     this.chart.data.datasets[2].data.push(response.body[item].gear);
      //     this.chart.data.datasets[3].data.push(response.body[item].gaspedal);
      //     this.chart.data.datasets[4].data.push(response.body[item].brakepedal);
      //     this.chart.data.datasets[5].data.push(response.body[item].steerangle);


  calcTime(datasize: number): number {
      let wtime = datasize/(this.updateInterval/1000);
      return wtime;
  };

  prepData(response:any) {
    let graphproperties: any = {};
    for (const item in response.body) {
      for (let [key, value] of Object.entries(response.body[item])) {
        if (graphproperties[key] == undefined) {
          graphproperties[key] = [];
        }
        graphproperties[key].push(value);
      }
    };
    return graphproperties
  };

  updateData() {
    let header = { token: this.getToken() };

    this.request.httpGET('http://127.0.0.1:8000/api-datahandler/live', header).subscribe(
      (response) => {
        let chartdatasets: any = {
          'rpm': 0,
          'speedkmh': 1,
          'gear': 2,
          'gaspedal': 3,
          'brakepedal': 4,
          'steerangle': 5
        };

        let graphproperties = this.prepData(response)
        this.plotData(graphproperties, chartdatasets, graphproperties['timestamp'].length);
      },
      (error) => {
        console.log('Graph Data Collector Error!');
      }
    );
  };

  plotData(graphproperties: any, datasetscontroll: any, graphpropertiessize: any){
    for (let [key, value] of Object.entries(graphproperties)){
      if (key == 'timestamp'){
        this.chart.data.labels = graphproperties['timestamp'];
        continue;
      };
      this.chart.data.datasets[datasetscontroll[key]].data.shift();
      this.chart.update();

      setInterval(() =>{
        this.chart.data.datasets[datasetscontroll[key]].data.push(graphproperties[key]);
        this.chart.update();
      }, this.calcTime(graphpropertiessize));

      //this.chart.data.datasets[datasetscontroll[key]].data.push()
    };
    //this.chart.update();
  };

  ngAfterViewInit() {
    this.chartcontext = this.chartelement.nativeElement.getContext('2d');
    this.chartIt();
    this.updateData();

    this.interval = setInterval(() => {
      this.updateData();
    },this.updateInterval);

  };

  ngOnDestroy() {
    clearTimeout(this.interval);

  };
};
