import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale,  Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-livegraph',
  templateUrl: './livegraph.component.html',
  styleUrls: ['./livegraph.component.scss'],
})
export class LivegraphComponent implements OnInit {
  context: any;
  @ViewChild('chartjs') chart!: any;

  data = {
    labels: ['0:00.000', '0:00.005'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [0, 5],
        borderWidth: 100,
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  constructor() {
    Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.context = this.chart.nativeElement.getContext('2d');

    var myChart = new Chart(this.context, {
      type: 'line',
      data: this.data,
    });

    console.log(myChart);
    console.log(typeof myChart);
  }
}
