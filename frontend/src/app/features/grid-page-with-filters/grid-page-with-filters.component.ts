import { Component } from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ITextFilterParams} from "ag-grid-community";
import {MyGridService} from "../../services/my-grid.service";
import {GridWithFiltersRowDTO} from "../../models/grid-with-filters-row-dto";

@Component({
  selector: 'app-grid-page-with-filters',
  templateUrl: './grid-page-with-filters.component.html',
  styleUrls: ['./grid-page-with-filters.component.scss']
})
export class GridPageWithFiltersComponent {

    public gridOptions: GridOptions = {
      domLayout: 'normal',
      debug: false,
      rowModelType: 'clientSide'
    };

  public columnDefs: ColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'report_name'
    },
    {
      field: 'indicator_count'
    },
    {
      field: 'last_updated_date'
    }
  ];


  private textFilterParams: ITextFilterParams = {
    filterOptions: ['contains', 'notContains'],         // Customize the filter to only show "Contains" and "Not Contains"
    caseSensitive: false,                               // Filter is case-insensitive
    debounceMs: 200,
    suppressAndOrCondition: true
  };


  public defaultColumnDef: ColDef = {
    flex: 1,
    sortable: true,
    floatingFilter: true,                   // Show the floating filter (beneath the column label)
    filter: 'agTextColumnFilter',           // Specify the type of filter
    filterParams: this.textFilterParams,    // Customize the filter
  }

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public constructor(private myGridService: MyGridService) { }

  public onGridReady(aParams: GridReadyEvent): void {
    this.gridApi = aParams.api;
    this.gridColumnApi = aParams.columnApi;

    // Show the loading overlay
    this.gridApi.showLoadingOverlay();

    // Invoke the REST call to get the grid data
    this.myGridService.getAllReports().subscribe( (aData: GridWithFiltersRowDTO[]) => {
      // REST call came back with data

      // Load the grid with data from the REST call
      this.gridApi.setRowData(aData);
    })
  }
}
