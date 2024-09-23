import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService{
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
    if (this.dataSource.datasets[0].data.length == 0) {
      this.getData();
    }
  }

  public getData(): void {
    this.http.get(`http://${document.location.hostname}:3000/budget`)
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
    });
  }
}
