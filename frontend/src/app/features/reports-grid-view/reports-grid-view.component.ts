import { Component } from '@angular/core';
import {ColDef, GridOptions} from "ag-grid-community";
import {RowDataDTO} from "../../models/row-data-dto";

@Component({
  selector: 'app-reports-grid-view',
  templateUrl: './reports-grid-view.component.html',
  styleUrls: ['./reports-grid-view.component.scss']
})
export class ReportsGridViewComponent {

    public gridOptions: GridOptions = {
      domLayout: 'normal',
      debug: true,
      rowModelType: 'clientSide'
    };


    public columnDefs: ColDef[] = [
      {
        headerName: 'Id',
        field: 'id'
      },
      {
        headerName: 'Name',
        field: 'name'
      },
      {
        headerName: 'Priority',
        field: 'priority'
      },
      {
        headerName: 'Start Date',
        field: 'start_date',

      },
      {
        headerName: 'End Date',
        field: 'end_date'}
    ];


  private textFilterParams = {
    filterOptions: ['contains', 'notContains'],
    caseSensitive: false,
    debounceMs: 200,
    suppressAndOrCondition: true,
  };

    public defaultColumnDef: ColDef = {
      flex: 1,
      sortable: true
    }




    public rowData: RowDataDTO[] = [
        {
          id: 1,
          name: 'Report 1',
          priority: 'Low',
          start_date: '05/01/2024',
          end_date: '06/01/2024'
        },
        {
          id: 2,
          name: 'Report 2',
          priority: 'Medium',
          start_date: '07/01/2024',
          end_date: '07/01/2024'
        },
        {
          id: 3,
          name: 'Report 3',
          priority: 'High',
          start_date: '08/01/2024',
          end_date: '08/01/2024'
        },
      ];

}
