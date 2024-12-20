import { Component } from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ITextFilterParams} from "ag-grid-community";
import {MySearchService} from "../../services/my-search.service";
import {GridCellRendererRowDataDTO} from "../../models/grid-cell-renderer-row-data-dto";
import {DateService} from "../../services/date.service";
import {
  RegistrationStatusCustomRendererComponent
} from "../registration-status-custom-renderer/registration-status-custom-renderer.component";

@Component({
  selector: 'app-grid-page-with-cell-renderer',
  templateUrl: './grid-page-with-cell-renderer.component.html',
  styleUrls: ['./grid-page-with-cell-renderer.component.scss']
})
export class GridPageWithCellRendererComponent {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public gridOptions: GridOptions = {
    domLayout: 'normal',
    debug: true,
    rowModelType: 'clientSide'
  };

  public columnDefs: ColDef[] = [
    {
      field: 'id',
      cellClass: 'grid-text-cell-format'
    },
    {
      field: 'full_name',
      cellClass: 'grid-text-cell-format'
    },
    {
      field: 'registration_status_text',
      cellRenderer: RegistrationStatusCustomRendererComponent,
      autoHeight: true
    },
    {
      field: 'registration_date',
      cellClass: 'grid-text-cell-format',
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

  public constructor(private mySearchService: MySearchService,
                     private dateService: DateService)  { }

  public onGridReady(aParams: GridReadyEvent) {
    // Get a reference to the gridApi and gridColumnApi (which we will need later to get selected rows)
    this.gridApi = aParams.api;
    this.gridColumnApi = aParams.columnApi;

    // Show the loading overlay
    this.gridApi.showLoadingOverlay();

    // Invoke the REST call to get the grid data
    this.mySearchService.getAllUsers().subscribe( (aData: GridCellRendererRowDataDTO[]) => {
      // REST call came back with data

      // Load the grid with data from the REST call
      this.gridApi.setRowData(aData);
    })

  }

}
