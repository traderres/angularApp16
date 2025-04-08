import { Component } from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ITextFilterParams} from "ag-grid-community";
import {ExceptionRecordService} from "../../services/exception-record.service";
import {ExceptionRecordDTO} from "../../models/exception-record-dto";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-grid-page-with-too-many-rows',
  templateUrl: './grid-page-with-too-many-rows.component.html',
  styleUrls: ['./grid-page-with-too-many-rows.component.scss']
})
export class GridPageWithTooManyRowsComponent {

  public constructor(private exceptionRecordService: ExceptionRecordService,
                     private dateService: DateService)
  {  }

  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;

  public totalFilteredMatchesAndLabel: string;
  public rawSearchQuery: string;
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
      field: 'user_cert_name'
    },
    {
      field: 'user_full_name'
    },
    {
      field: 'app_name'
    },
    {
      field: 'app_version',
    },
    {
      field: 'url',
    },
    {
      field: 'event_date',
      comparator: (a: string, b: string) => this.dateService.dateComparator(a,b)
    },
    {
      field: 'message',
    },
    {
      field: 'cause',
    },
    {
      field: 'stack_trace',
    }
  ];


  // Customize the filters (when turned on)
  private textFilterParams: ITextFilterParams = {
    filterOptions: ['contains', 'notContains'],         // Customize the filter to only show "Contains" and "Not Contains"
    caseSensitive: false,                               // Filter is case-insensitive
    debounceMs: 200,
    maxNumConditions: 1
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
    this.exceptionRecordService.getAllExceptions().subscribe( (aData: ExceptionRecordDTO[]) => {
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

  public resetGrid(): void {
    // Reset the columns back to default  *BEFORE*  auto-sizing them sizing them
    this.gridColumnApi.resetColumnState();

    // Size the columns to fit
    this.gridApi.sizeColumnsToFit();
  }

}
