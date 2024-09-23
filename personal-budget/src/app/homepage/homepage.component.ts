import { Component, OnInit } from '@angular/core';
import {Chart, ChartItem} from 'chart.js/auto';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    const loop = setInterval(() => {
      if (this.dataService.dataSource.labels.length > 0) {
        this.createChart();
        clearInterval(loop);
      }
    }, 100);
  }

  createChart() {
    let chart = document.getElementById('myChart') as ChartItem;
    if (chart) {
      var myPieChart = new Chart(chart, {
          type: 'pie',
          data: this.dataService.dataSource
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
