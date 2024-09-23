import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { DataService } from '../data.service';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  private width = 520;
  private height = this.width * 0.52;
  private radius = Math.min(this.width, this.height) / 2;
  private svg: any;
  private pie: any;
  private colors: any;
  private labeledData: any;
  private innerArc: any;
  private outerArc: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const loop = setInterval(() => {
      if (this.dataService.dataSource.labels.length > 0) {
        this.createChart();
        this.createChart2();
        clearInterval(loop);
      }
    }, 100);
  }

  createChart() {
    let chart = document.getElementById('myChart') as ChartItem;
    if (chart) {
      var myPieChart = new Chart(chart, {
        type: 'pie',
        data: this.dataService.dataSource,
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
    }
  }

  createChart2() {
    this.svg = d3
      .select('#chart2')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');

    this.svg.append('g').attr('class', 'slices');
    this.svg.append('g').attr('class', 'labels');
    this.svg.append('g').attr('class', 'lines');

    this.pie = d3
      .pie()
      .sort(null)
      .value(function (d: any) {
        return d.value;
      });

    this.innerArc = d3
      .arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(this.radius * 0.4);

    this.outerArc = d3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    this.svg.attr(
      'transform',
      'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
    );

    this.colors = d3
      .scaleOrdinal()
      .domain(this.dataService.dataSource.labels)
      .range(this.dataService.dataSource.datasets[0].backgroundColor);

    this.labeledData = this.colors.domain().map((label: any, index: any) => {
      return {
        label: label,
        value: this.dataService.dataSource.datasets[0].data[index],
      };
    });

    this.change(this.labeledData);
  }

  midAngle(d: any) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  change(data: any) {
    var slice = this.svg
      .select('.slices')
      .selectAll('path.slice')
      .data(this.pie(data))
      .enter()
      .append('path')
      .attr('fill', (d: any) => this.colors(d.data.value))
      .attr('d', this.innerArc);

    slice.exit().remove();

    var text = this.svg
      .select('.labels')
      .selectAll('text')
      .data(this.pie(data))
      .enter()
      .append('text')
      .text((d: any) => {
        return d.data.label;
      })
      .attr('dy', '.35em')
      .attr('transform', (d: any) => {
        var pos = this.outerArc.centroid(d);
        pos[0] = this.radius * (this.midAngle(d) < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d: any) => {
        return this.midAngle(d) < Math.PI ? 'start' : 'end';
      });

    text.exit().remove();

    var polyline = this.svg
      .select('.lines')
      .selectAll('polyline')
      .data(this.pie(data))
      .enter()
      .append('polyline')
      .attr('points', (d: any) => {
        var posA = this.innerArc.centroid(d);
        var posB = this.outerArc.centroid(d);
        var posC = this.outerArc.centroid(d);
        posC[0] = this.radius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    polyline.exit().remove();
  }
}
