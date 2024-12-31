import { Component } from '@angular/core';
import {
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  ITextFilterParams
} from "ag-grid-community";
import {MyReportService} from "../../services/my-report.service";
import {GridCellRendererWithButtonRowDataDTO} from "../../models/grid-cell-renderer-with-button-row-data-dto";
import {DateService} from "../../services/date.service";
import {
  RegistrationStatusCustomRendererComponent
} from "../registration-status-custom-renderer/registration-status-custom-renderer.component";
import {
  ReportGridActionCellRendererComponent
} from "./report-grid-action-cell-renderer/report-grid-action-cell-renderer.component";

@Component({
  selector: 'app-grid-page-with-buttons',
  templateUrl: './grid-page-with-buttons.component.html',
  styleUrls: ['./grid-page-with-buttons.component.scss']
})
export class GridPageWithButtonsComponent {

  public constructor(private myReportService: MyReportService,
                     private dateService: DateService) {
  }

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public gridOptions: GridOptions = {
    domLayout: 'normal',
    debug: true,
    rowModelType: 'clientSide',
    suppressCellFocus: true,
  };


  public columnDefs: ColDef[] = [
    {
      headerName: 'Action',
      cellRenderer: ReportGridActionCellRendererComponent,
      cellRendererParams: {
        deleteClicked: (params: ICellRendererParams) => this.openDeleteDialog(params.data.id, params.data.report_name),
        editClicked: (params: ICellRendererParams) => this.openEditDialog(params.data.id)
      }
    },
    {
      field: 'id'
    },
    {
      field: 'report_name'
    },
    {
      field: 'priority_label'
    },
    {
      field: 'start_date',
      comparator: (a: string, b: string) => this.dateService.dateComparator(a,b)
    },
    {
      field: 'end_date',
      comparator: (a: string, b: string) => this.dateService.dateComparator(a,b)
    }
  ];


  // Customize the filters (when turned on)
  private textFilterParams: ITextFilterParams = {
    filterOptions: ['contains', 'notContains'],         // Customize the filter to only show "Contains" and "Not Contains"
    caseSensitive: false,                               // Filter is case-insensitive
    debounceMs: 200,
    suppressAndOrCondition: true,
  };


  public defaultColumnDef: ColDef = {
    flex: 1,
    sortable: true,                         // All columns are sortable
    floatingFilter: true,                   // Show the floating filter (beneath the column label)
    filter: 'agTextColumnFilter',           // Specify the type of filter
    filterParams: this.textFilterParams,    // Customize the filter
  }

  public onGridReady(aParams: GridReadyEvent) {
    // Get a reference to the gridApi and gridColumnApi (which we will need later to get selected rows)
    this.gridApi = aParams.api;
    this.gridColumnApi = aParams.columnApi;

    // Show the loading overlay
    this.gridApi.showLoadingOverlay();

    // Invoke the REST call to get the grid data
    this.myReportService.getAllReports().subscribe( (aData: GridCellRendererWithButtonRowDataDTO[]) => {
      // REST call came back with data

      // Load the grid with data from the REST call
      this.gridApi.setRowData(aData);
    })

  }

  public openDeleteDialog(aReportId: number, aReportName: string): void {
    console.log('openDeleteDialog()  aReportID=', aReportId, '  aReportName=', aReportId);
  }

  public openEditDialog(aReportId: number): void {
    console.log('openEditDialog()  aReportID=', aReportId);
  }


}
