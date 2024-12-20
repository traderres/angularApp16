import { Component } from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ITextFilterParams} from "ag-grid-community";
import {MySearchService} from "../../services/my-search.service";
import {GridSortingRowDataDTO} from "../../models/grid-sorting-row-data-dto";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-grid-page-with-sorting',
  templateUrl: './grid-page-with-sorting.component.html',
  styleUrls: ['./grid-page-with-sorting.component.scss']
})
export class GridPageWithSortingComponent {

  public constructor(private mySearchService: MySearchService,
                     private dateService: DateService) { }

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;


  public gridOptions: GridOptions = {
      domLayout: 'normal',
      debug: false,
      rowModelType: 'clientSide'
    };

  public columnDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: 'id'
    },
    {
      headerName: 'Name',
      field: 'contract_name'
    },
    {
      headerName: 'CAGE Code',
      field: 'cage_code'
    },
    {
      headerName: 'Start Date',
      field: 'start_date',
      comparator: (a: string, b: string) => this.dateService.dateComparator(a,b)
    },
    {
      headerName: 'End Date',
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
    this.mySearchService.getAllContracts().subscribe( (aData: GridSortingRowDataDTO[]) => {
      // REST call came back with data

      // Load the grid with data from the REST call
      this.gridApi.setRowData(aData);
    })

  }


}
