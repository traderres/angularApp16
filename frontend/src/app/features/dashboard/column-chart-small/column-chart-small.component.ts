import {AfterViewInit, Component} from '@angular/core';

import * as Highcharts from "highcharts";
window.Highcharts = Highcharts;

// Turn on the high-chart context menu view/print/download options
import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

// Turn on the high-chart context menu *export* options
// NOTE:  This provides these menu options: Download CSV, Download XLS, View Data Table
import HC_exportData from "highcharts/modules/export-data";
HC_exportData(Highcharts);

// Do client-side exporting (so that the exporting does *NOT* go to https://export.highcharts.com/
// NOTE:  This does not work on all web browsers
import HC_offlineExport from "highcharts/modules/offline-exporting";
HC_offlineExport(Highcharts);

// Turn on the drill-down capabilities
import {Chart} from "highcharts";
import HC_drillDown from "highcharts/modules/drilldown";
HC_drillDown(Highcharts);


@Component({
  selector: 'app-column-chart-small',
  templateUrl: './column-chart-small.component.html',
  styleUrls: ['./column-chart-small.component.scss']
})
export class ColumnChartSmallComponent implements AfterViewInit {

  private chartOptions: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Browser market shares. January, 2022'
    },
    subtitle: {
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total percent market share'
      }

    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
        '<b>{point.y:.2f}%</b> of total<br/>'
    }
  };


  public reloadData(): void {
    this.chartOptions.series =  [
      {
        name: 'Browsers',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 63.06,
            drilldown: 'Chrome'
          },
          {
            name: 'Safari',
            y: 19.84,
            drilldown: 'Safari'
          },
          {
            name: 'Firefox',
            y: 4.18,
            drilldown: 'Firefox'
          },
          {
            name: 'Edge',
            y: 4.12,
            drilldown: 'Edge'
          },
          {
            name: 'Opera',
            y: 2.33,
            drilldown: 'Opera'
          },
          {
            name: 'Internet Explorer',
            y: 0.45,
            drilldown: 'Internet Explorer'
          },
          {
            name: 'Other',
            y: 1.582,
            drilldown: null
          }
        ]
      }
    ];

    this.chartOptions.drilldown = {
      breadcrumbs: {
        position: {
          align: 'right'
        }
      },
      series: [
        {
          name: 'Chrome',
          id: 'Chrome',
          data: [
            [
              'v65.0',
              0.1
            ],
            [
              'v64.0',
              1.3
            ],
            [
              'v63.0',
              53.02
            ],
            [
              'v62.0',
              1.4
            ],
            [
              'v61.0',
              0.88
            ],
            [
              'v60.0',
              0.56
            ],
            [
              'v59.0',
              0.45
            ],
            [
              'v58.0',
              0.49
            ],
            [
              'v57.0',
              0.32
            ],
            [
              'v56.0',
              0.29
            ],
            [
              'v55.0',
              0.79
            ],
            [
              'v54.0',
              0.18
            ],
            [
              'v51.0',
              0.13
            ],
            [
              'v49.0',
              2.16
            ],
            [
              'v48.0',
              0.13
            ],
            [
              'v47.0',
              0.11
            ],
            [
              'v43.0',
              0.17
            ],
            [
              'v29.0',
              0.26
            ]
          ]
        },
        {
          name: 'Firefox',
          id: 'Firefox',
          data: [
            [
              'v58.0',
              1.02
            ],
            [
              'v57.0',
              7.36
            ],
            [
              'v56.0',
              0.35
            ],
            [
              'v55.0',
              0.11
            ],
            [
              'v54.0',
              0.1
            ],
            [
              'v52.0',
              0.95
            ],
            [
              'v51.0',
              0.15
            ],
            [
              'v50.0',
              0.1
            ],
            [
              'v48.0',
              0.31
            ],
            [
              'v47.0',
              0.12
            ]
          ]
        },
        {
          name: 'Internet Explorer',
          id: 'Internet Explorer',
          data: [
            [
              'v11.0',
              6.2
            ],
            [
              'v10.0',
              0.29
            ],
            [
              'v9.0',
              0.27
            ],
            [
              'v8.0',
              0.47
            ]
          ]
        },
        {
          name: 'Safari',
          id: 'Safari',
          data: [
            [
              'v11.0',
              3.39
            ],
            [
              'v10.1',
              0.96
            ],
            [
              'v10.0',
              0.36
            ],
            [
              'v9.1',
              0.54
            ],
            [
              'v9.0',
              0.13
            ],
            [
              'v5.1',
              0.2
            ]
          ]
        },
        {
          name: 'Edge',
          id: 'Edge',
          data: [
            [
              'v16',
              2.6
            ],
            [
              'v15',
              0.92
            ],
            [
              'v14',
              0.4
            ],
            [
              'v13',
              0.1
            ]
          ]
        },
        {
          name: 'Opera',
          id: 'Opera',
          data: [
            [
              'v50.0',
              0.96
            ],
            [
              'v49.0',
              0.82
            ],
            [
              'v12.1',
              0.14
            ]
          ]
        }
      ]
    };

    // This renders the chart
    // NOTE:  You cannot render a chart from ngOnInit().  You can from ngAfterViewInit().
    Highcharts.chart('chart3', this.chartOptions);

    // Redraw all of the charts on this page (so they fit perfectly within the mat-card tags
    Highcharts.charts.forEach(function (chart: Chart | undefined) {
      chart?.reflow();
    });

  }


  public ngAfterViewInit(): void {
    // NOTE:  This call must be in ngAfterViewInit() and not in ngOnInit()
    setTimeout( () => {
      // Reload the data in a setTimeout block so Angular has time to build the page
      this.reloadData();
    });
  }

}
