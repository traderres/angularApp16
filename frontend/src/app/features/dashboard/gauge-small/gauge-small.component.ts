import {AfterViewInit, Component} from '@angular/core';
import {ChartService} from "../../../services/chart.service";
import {GaugeDataDTO} from "../../../models/gauge-data-dto";


import * as Highcharts from "highcharts";
window.Highcharts = Highcharts;

// Included because the solid gauge charts are not included in vanilla Highcharts
import HC_more from "highcharts/highcharts-more";
import HC_solidGauge from 'highcharts/modules/solid-gauge';
HC_more(Highcharts);
HC_solidGauge(Highcharts);


@Component({
  selector: 'app-gauge-small',
  templateUrl: './gauge-small.component.html',
  styleUrls: ['./gauge-small.component.scss']
})
export class GaugeSmallComponent implements AfterViewInit {

  public constructor(private chartService: ChartService) {
  }


  private gaugeChartOptions1: any = {
    chart: {
      type: 'solidgauge'
    },
    pane: {
      center: ['50%', '65%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },

    exporting: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },

    // the value axis
    yAxis: {
      min: 0,
      stops: [
        [1, '#800080'] // purple
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      labels: {
        y: 16
      }
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: null           // set the text to null to disable the title
    },
    series: [{
      name: 'Total WIP Reports',
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:25px">{y}</span><br/>' +
          '<span style="font-size:12px;opacity:0.4">Total WIP Reports</span>' +
          '</div>'
      }
    }]
  };

  private gaugeChartOptions2: any = {
    chart: {
      type: 'solidgauge'
    },
    pane: {
      center: ['50%', '65%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },

    exporting: {
      enabled: false
    },

    tooltip: {
      enabled: false
    },

    // the value axis
    yAxis: {
      min: 0,
      stops: [
        [1, '#FF0000'] // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      labels: {
        y: 16
      }
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: null           // set the text to null to disable the title
    },
    series: [{
      name: 'Total Pending Reports',
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:25px">{y}</span><br/>' +
          '<span style="font-size:12px;opacity:0.4">Total Pending Reports</span>' +
          '</div>'
      }
    }]
  };

  private gaugeChartOptions3: any = {
    chart: {
      type: 'solidgauge'
    },
    pane: {
      center: ['50%', '65%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    exporting: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    // the value axis
    yAxis: {
      min: 0,
      stops: [
        [1, '#008000'] // green
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      labels: {
        y: 16
      }
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },

    credits: {
      enabled: false
    },

    title: {
      text: null           // set the text to null to disable the title
    },
    series: [{
      name: 'Total Completed Reports',
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:25px">{y}</span><br/>' +
          '<span style="font-size:12px;opacity:0.4">Total Completed Reports</span>' +
          '</div>'
      }
    }]
  };


  private reloadData(): void {
    this.chartService.getGaugeData().subscribe( (aData: GaugeDataDTO) => {
      // The REST Call came back with the USA Map data

      // Store the updated data in the 3 gauge charts
      this.gaugeChartOptions1.series[0].data = [aData.total_pending_reports];
      this.gaugeChartOptions1.yAxis.max = aData.total_reports;

      this.gaugeChartOptions2.series[0].data = [aData.total_wip_reports];
      this.gaugeChartOptions2.yAxis.max = aData.total_reports;

      this.gaugeChartOptions3.series[0].data = [aData.total_completed_reports];
      this.gaugeChartOptions3.yAxis.max = aData.total_reports;

      // Render the 3 charts
      Highcharts.chart('gaugeChart1', this.gaugeChartOptions1);
      Highcharts.chart('gaugeChart2', this.gaugeChartOptions2);
      Highcharts.chart('gaugeChart3', this.gaugeChartOptions3);
    });

  }  // end of reloadData()

  public ngAfterViewInit(): void {

    setTimeout( () => {
      this.reloadData();
    })
  }

}
