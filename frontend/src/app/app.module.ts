import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./layout/welcome/welcome.component";
import {NotFoundComponent} from "./errors/not-found/not-found.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./errorHandler/error.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import { SamplePageComponent } from './features/sample-page/sample-page.component';
import {Constants} from "./utilities/constants";
import { SamplePage2Component } from './features/sample-page2/sample-page2.component';
import {ClassificationBannerComponent} from "./layout/classification-banner/classification-banner.component";
import {HeaderComponent} from "./layout/header/header.component";
import {NavbarExtendedComponent} from "./layout/navbar/navbar-extended/navbar-extended.component";
import {NavbarCollapsedComponent} from "./layout/navbar/navbar-collapsed/navbar-collapsed.component";
import { UserAdminComponent } from './features/admin/user-admin/user-admin.component';
import { UserSettingsComponent } from './features/user-settings/user-settings.component';
import {PageGuard} from "./guards/page.guard";
import {AgGridModule} from "ag-grid-angular";
import { ListExceptionsGridComponent } from './features/admin/list-exceptions/list-exceptions-grid/list-exceptions-grid.component';
import { ListExceptionsActionRendererComponent } from './features/admin/list-exceptions/list-exceptions-action-renderer/list-exceptions-action-renderer.component';
import { GridPageWithTooManyRowsComponent } from './features/grid-page-with-too-many-rows/grid-page-with-too-many-rows.component';
import { GridPageWithCustomFilterComponent } from './features/grid-page-with-custom-filter/grid-page-with-custom-filter.component';
import { DropDownFloatingFilterComponent } from './features/drop-down-floating-filter/drop-down-floating-filter.component';
import { TabGroupPageComponent } from './features/tab-group-page/tab-group-page.component';
import { TabUserProfileComponent } from './features/tab-group-page/tab-user-profile/tab-user-profile.component';
import { TabCompletedActionsComponent } from './features/tab-group-page/tab-completed-actions/tab-completed-actions.component';
import { TabWorkInProgressActionsComponent } from './features/tab-group-page/tab-work-in-progress-actions/tab-work-in-progress-actions.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page/dashboard-page.component';
import { PieChartSmallComponent } from './features/dashboard/pie-chart-small/pie-chart-small.component';
import { PieChartLargeComponent } from './features/dashboard/pie-chart-large/pie-chart-large.component';
import { LineChartSmallComponent } from './features/dashboard/line-chart-small/line-chart-small.component';
import { ColumnChartSmallComponent } from './features/dashboard/column-chart-small/column-chart-small.component';
import { ColumnChartLargeComponent } from './features/dashboard/column-chart-large/column-chart-large.component';
import { ZommableTimeSeriesLineChartSmallComponent } from './features/dashboard/zommable-time-series-line-chart-small/zommable-time-series-line-chart-small.component';
import { ZommableTimeSeriesLineChartLargeComponent } from './features/dashboard/zommable-time-series-line-chart-large/zommable-time-series-line-chart-large.component';
import { UsaMapSmallComponent } from './features/dashboard/usa-map-small/usa-map-small.component';
import { UsaMapLargeComponentComponent } from './features/dashboard/usa-map-large-component/usa-map-large-component.component';
import { GaugeSmallComponent } from './features/dashboard/gauge-small/gauge-small.component';
import { GaugeLargeComponent } from './features/dashboard/gauge-large/gauge-large.component';
import { ChipsWithTextboxPageComponent } from './features/chips-with-textbox-page/chips-with-textbox-page.component';
import { ChipWithAutocompleteComponent } from './features/chip-with-autocomplete/chip-with-autocomplete.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { GridPageWithChipSelectionComponent } from './features/grid-page-with-chip-selection/grid-page-with-chip-selection.component';

// Setup the routes.  If no route is found, then take the user to the NotFoundComponent
// NOTE:  The **ORDER** of these routes matters.  The NotFoundComponent should always be last
const appRoutes: Routes = [
  { path:  Constants.SAMPLE_PAGE_ROUTE,       component: SamplePageComponent,          canActivate: [PageGuard.canActivate ] },
  { path:  Constants.SAMPLE_PAGE_ROUTE_2,     component: SamplePage2Component,         canActivate: [PageGuard.canActivate ] },
  { path:  Constants.LIST_EXCEPTIONS_ROUTE,   component: ListExceptionsGridComponent,  canActivate: [PageGuard.canActivate ] },
  { path:  Constants.USER_ADMIN_ROUTE,        component: UserAdminComponent,           canActivate: [PageGuard.canActivate ] },
  { path:  Constants.USER_SETTINGS_ROUTE,     component: UserSettingsComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.GRID_PAGE_WITH_TOO_MANY_ROWS_ROUTE,     component: GridPageWithTooManyRowsComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.GRID_PAGE_WITH_CUSTOM_FILTER_ROUTE,     component: GridPageWithCustomFilterComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.TAB_GROUP_PAGE_ROUTE,     component: TabGroupPageComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.DASHBOARD_PAGE_ROUTE,    component: DashboardPageComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.PIE_CHART_PAGE_ROUTE,    component: PieChartLargeComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.COLUMN_CHART_DRILL_DOWN_PAGE_ROUTE,       component: ColumnChartLargeComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.LINE_CHART_ZOMMABLE_TIME_SERIES_ROUTE,    component: ZommableTimeSeriesLineChartLargeComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.LARGE_USA_MAP_PAGE_ROUTE,            component: UsaMapLargeComponentComponent,        canActivate: [PageGuard.canActivate ] },
  { path:  Constants.LARGE_GAUGE_PAGE_ROUTE,              component: GaugeLargeComponent,            canActivate: [PageGuard.canActivate ] },
  { path:  Constants.CHIPS_WITH_TEXTBOX_PAGE_ROUTE,       component: ChipsWithTextboxPageComponent,  canActivate: [PageGuard.canActivate ] },
  { path:  Constants.CHIPS_WITH_AUTOCOMPLETE_PAGE_ROUTE,  component: ChipWithAutocompleteComponent,  canActivate: [PageGuard.canActivate ] },
  { path:  Constants.GRID_PAGE_WITH_CHIP_SELECTION_ROUTE, component: GridPageWithChipSelectionComponent,  canActivate: [PageGuard.canActivate ] },

  { path:  '',                                component: WelcomeComponent,             canActivate: [PageGuard.canActivate ] },
  { path:  '**',                              component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SamplePageComponent,
    SamplePage2Component,
    WelcomeComponent,
    ClassificationBannerComponent,
    HeaderComponent,
    NavbarExtendedComponent,
    NavbarCollapsedComponent,
    UserAdminComponent,
    UserSettingsComponent,
    ListExceptionsGridComponent,
    ListExceptionsActionRendererComponent,
    GridPageWithTooManyRowsComponent,
    GridPageWithCustomFilterComponent,
    DropDownFloatingFilterComponent,
    TabGroupPageComponent,
    TabUserProfileComponent,
    TabCompletedActionsComponent,
    TabWorkInProgressActionsComponent,
    DashboardPageComponent,
    PieChartSmallComponent,
    PieChartLargeComponent,
    LineChartSmallComponent,
    ColumnChartSmallComponent,
    ColumnChartLargeComponent,
    ZommableTimeSeriesLineChartSmallComponent,
    ZommableTimeSeriesLineChartLargeComponent,
    UsaMapSmallComponent,
    UsaMapLargeComponentComponent,
    GaugeSmallComponent,
    GaugeLargeComponent,
    ChipsWithTextboxPageComponent,
    ChipWithAutocompleteComponent,
    GridPageWithChipSelectionComponent,
  ],
    imports: [
        AgGridModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatChipsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        MatAutocompleteModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
