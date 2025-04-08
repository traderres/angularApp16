import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Constants} from "../../../utilities/constants";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  public constructor(private router: Router) {}

  public navigateToPieChartPage(): void {
    this.router.navigate([Constants.PIE_CHART_PAGE_ROUTE]).then()
  }

  public navigateToColumnChartPage(): void {
    this.router.navigate([Constants.COLUMN_CHART_DRILL_DOWN_PAGE_ROUTE]).then()
  }

  public navigateToZommableTimeSeriesLineChartPage() : void {
    this.router.navigate( [Constants.LINE_CHART_ZOMMABLE_TIME_SERIES_ROUTE]).then()
  }

  public navigateToUsaMapPage(): void {
    this.router.navigate([Constants.LARGE_USA_MAP_PAGE_ROUTE]).then()
  }

  public navigateToGaugePage(): void {
    this.router.navigate([Constants.LARGE_GAUGE_PAGE_ROUTE]).then()
  }

}
