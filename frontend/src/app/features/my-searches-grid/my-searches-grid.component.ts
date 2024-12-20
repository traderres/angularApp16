import { Component } from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
import {SavedSearchDTO} from "../../models/saved-search-dto";
import {MySearchService} from "../../services/my-search.service";

@Component({
  selector: 'app-my-searches-grid',
  templateUrl: './my-searches-grid.component.html',
  styleUrls: ['./my-searches-grid.component.scss']
})
export class MySearchesGridComponent {

  public constructor(private mySearchService: MySearchService) {

  }

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

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
      field: 'name'
    },
    {
      field: 'search_query'
    },
    {
      field: 'last_executed_date'
    }
  ];


  public defaultColumnDef: ColDef = {
    flex: 1,
    sortable: true
  }





  public onGridReady(aParams: GridReadyEvent) {
    // Get a reference to the gridApi and gridColumnApi (which we will need later to get selected rows)
    this.gridApi = aParams.api;
    this.gridColumnApi = aParams.columnApi;

    // Show the loading overlay
    this.gridApi.showLoadingOverlay();

    // Invoke the REST call to get the grid data
    this.mySearchService.getUsersSavedSearches().subscribe( (aData: SavedSearchDTO[]) => {
      // REST call came back with data

      // Load the grid with data from the REST call
      this.gridApi.setRowData(aData);
    })

  }

}
