import { Component } from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ITextFilterParams} from "ag-grid-community";
import {MyReportService} from "../../services/my-report.service";
import {GridCellDataForSearchingFiltersDTO} from "../../models/grid-cell-data-for-searching-filters-dto";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-grid-page-with-filter-search-box',
  templateUrl: './grid-page-with-filter-search-box.component.html',
  styleUrls: ['./grid-page-with-filter-search-box.component.scss']
})
export class GridPageWithFilterSearchBoxComponent {

  public constructor(private myReportService: MyReportService,
                     private dateService: DateService)  {}

  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;

  public totalFilteredMatchesAndLabel: string;
  public rawSearchQuery: string = "";
  public totalRecordsOnPageLoad: number;

  public gridOptions: GridOptions = {
    domLayout: 'normal',
    debug: true,
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
    maxNumConditions: 1,                                // Suppress and/or conditions
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
    this.myReportService.getAllReports2().subscribe( (aData: GridCellDataForSearchingFiltersDTO[]) => {
      // REST call came back with data

      if (!aData) {
        this.totalRecordsOnPageLoad = 0;
      }
      else {
        this.totalRecordsOnPageLoad = aData.length;
      }


      // Load the grid with data from the REST call
      this.gridApi.setRowData(aData);
    })
  }


  private refreshTotalFilteredMatchAndLabels(): void {
    let totalRecordsVisible: number =  this.gridApi.getDisplayedRowCount();
    if (totalRecordsVisible == 0) {
      this.totalFilteredMatchesAndLabel = "No Matches";
    }
    else if (totalRecordsVisible == 1) {
      this.totalFilteredMatchesAndLabel = "1 Match"
    }
    else {
      this.totalFilteredMatchesAndLabel = String(totalRecordsVisible) + " Matches";
    }
  }


  public runClientGridSearch(aRawQuery: string): void {
    // Run the search on this client side grid
    this.gridApi.setQuickFilter(aRawQuery);

    // Refresh the total matches label
    this.refreshTotalFilteredMatchAndLabels();
  }

  public clearSearch(): void {
    // Clear the search query
    this.rawSearchQuery = "";

    // Clear the filter and refresh the totals
    this.runClientGridSearch('');
  }

}
