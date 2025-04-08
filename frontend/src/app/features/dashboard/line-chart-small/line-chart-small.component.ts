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
import {ChartService} from "../../../services/chart.service";
import {GetChart2DataDTO} from "../../../models/dashboard/get-chart2-data-dto";
HC_drillDown(Highcharts);


@Component({
  selector: 'app-line-chart-small',
  templateUrl: './line-chart-small.component.html',
  styleUrls: ['./line-chart-small.component.scss']
})
export class LineChartSmallComponent implements AfterViewInit {

  public constructor(private chartService: ChartService) { }

  private chartOptions: any =   {

    title: {
      text: 'U.S Solar Employment Growth',
      align: 'left'
    },

    subtitle: {
      text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
      align: 'left'
    },

    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2022'
      }
    },

    legend: {
      enabled: false,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  };


  private reloadData(): void {
    // Update chart  with hard-coded data

    this.chartService.getAllDataForChart2().subscribe( (aData: GetChart2DataDTO[]) => {
      // The REST call came back with data

      // Set the data in the chartOptions object
      this.chartOptions.series = aData;

      // This renders the chart
      // NOTE:  You cannot render a chart from ngOnInit().  You can from ngAfterViewInit().
      Highcharts.chart('chart2', this.chartOptions);

      // Redraw all of the charts on this page (so they fit perfectly within the mat-card tags
      Highcharts.charts.forEach(function (chart: Chart | undefined) {
        chart?.reflow();
      });
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
