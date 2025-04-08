import {ChartService} from "../../../services/chart.service";
import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import * as Highcharts from "highcharts";
import MapModule from 'highcharts/modules/map';

MapModule(Highcharts);

// Turn on the highchart context menu *View/Print/Download* options
//  -- Gives you these menu options: View in Full Screen, Print Chart, Download PNG, Download JPEG, Download PDF, Download SVG
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

// Turn on the highchart context menu *export* options
// -- Gives you these menu options: Download CSV, Download XLS, View Data Table
import HC_exportData from 'highcharts/modules/export-data';
HC_exportData(Highcharts);

// Do client-side exporting (so that calls do *NOT* go to https://export.highcharts.com/ but does not work on all browsers
import HC_offlineExport from 'highcharts/modules/offline-exporting';
HC_offlineExport(Highcharts);

// Read the JSON (stored in us-all-territories.topo.json) into a variable called usaMapDataAsJson
// @ts-ignore
import usaMapDataAsJson from "@highcharts/map-collection/countries/us/custom/us-all-territories.topo.json";
import {Chart} from "highcharts";


@Component({
  selector: 'app-usa-map-small',
  templateUrl: './usa-map-small.component.html',
  styleUrls: ['./usa-map-small.component.scss']
})
export class UsaMapSmallComponent implements AfterViewInit, OnDestroy {

  public constructor(private chartService: ChartService) {}




  private mapOptions: any = {
        accessibility: {
          enabled: true
        },

        chart: {
          map: usaMapDataAsJson
        },
        title: {
          text: 'US population density (/km²)'
        },

        exporting: {
          sourceWidth: 600,
          sourceHeight: 500
        },

        legend: {
          layout: 'horizontal',
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.85)',
          floating: true,
          verticalAlign: 'top',
          y: 25
        },

        mapNavigation: {
          enabled: true
        },

        colorAxis: {
          min: 1,
          type: 'logarithmic',
          minColor: '#EEEEFF',
          maxColor: '#000022',
          stops: [
            [0, '#EFEFFF'],
            [0.67, '#4444FF'],
            [1, '#000022']
          ]
        },

        series: [{
          accessibility: {
            point: {
              valueDescriptionFormat: '{xDescription}, {point.value} ' +
                'people per square kilometer.'
            }
          },
          animation: {
            duration: 1000
          },
          joinBy: ['postal-code', 'code'],
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            format: '{point.code}'
          },
          name: 'Population density',
          tooltip: {
            pointFormat: '{point.code}: {point.value}/km²'
          }
        }]
     };

    private reloadData(): void {

      this.chartService.getUsaMapData().subscribe( (aMapData: any) => {
        // The REST Call came back with the USA Map data

        // Convert the codes to upper case *BEFORE* inserting it into the mapOptions object
        aMapData.forEach( (p: any) => {
          p.code = p.code.toUpperCase();
        });

        // Store the map data in the mapOptions object
        this.mapOptions.series[0].data = aMapData;

        // Render the map
        // NOTE:  You cannot render a chart or map from ngOnInit().  You can from ngAfterViewInit().
        Highcharts.mapChart('usaMap', this.mapOptions);
      });

    }   // end of reloadData()


  public ngAfterViewInit(): void {
    setTimeout( () => {
      // Reload the data in a setTimeout block so Angular has time to build the page
      // NOTE:  This call must be in ngAfterViewInit() and not in ngOnInit()
      this.reloadData();
    });
  }

  public ngOnDestroy(): void {
    // Destroy all charts
    Highcharts.charts.forEach( (chart: Chart | undefined)=> {
      if (chart) {
        chart.destroy();
      }
    });
  }

}
