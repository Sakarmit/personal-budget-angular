import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart, ChartItem} from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#800000',
          '#9A6324',
          '#fabed4',
          '#ffd8b1',
          '#3cb44b',
          '#aaffc3'
          ]
      }
    ],
    labels: [] as string[]
  };

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get(`http://${document.location.hostname}:3000/budget`)
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart() {
    let chart = document.getElementById('myChart') as ChartItem;
    if (chart) {
      var myPieChart = new Chart(chart, {
          type: 'pie',
          data: this.dataSource
      });

      // let budgetValues = "";
      // for (let i = 0; i < this.dataSource.labels.length; i++) {
      //     if (i != 0) {
      //         budgetValues += ', '
      //     }
      //     if (i == this.dataSource.labels.length - 1) {
      //         budgetValues += "and "
      //     }
      //     budgetValues += `$${this.dataSource.datasets[0].data[i]} for ${this.dataSource.labels[i]}`;
      // }

      // chart.setAttribute("aria-label",
      //     `Pie chart showing the distribution of expenses: ${budgetValues}`
      // );
    };
  }
}
