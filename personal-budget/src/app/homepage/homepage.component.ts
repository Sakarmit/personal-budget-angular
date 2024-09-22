import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  public dataSource = {
    datasets: [
      {
        data: [] as any[],
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
    labels: [] as any[]
  };

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get(`http://${location.hostname}:3000/budget`)
    .subscribe((res: any) => {
      for (var i = 0; i < res.data.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        this.dataSource.labels[i] = res.data.myBudget[i].title;
    }
    });
  }
}
