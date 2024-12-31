import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {GridCellRendererWithButtonRowDataDTO} from "../models/grid-cell-renderer-with-button-row-data-dto";
import {GridCellDataForSearchingFiltersDTO} from "../models/grid-cell-data-for-searching-filters-dto";

@Injectable({
  providedIn: 'root'
})
export class MyReportService {

  constructor() { }


  public getAllReports(): Observable<GridCellRendererWithButtonRowDataDTO[]> {
    let data: GridCellRendererWithButtonRowDataDTO[] = [
      {
        id: 101,
        report_name: 'Report #1',
        priority_label: 'Critical',
        start_date: '11/09/2023',
        end_date:   '09/05/2024'
      },
      {
        id: 102,
        report_name: 'Report #2',
        priority_label: 'Critical',
        start_date: '04/01/2022',
        end_date:   '05/02/2023'
      },
      {
        id: 103,
        report_name: 'Report #3',
        priority_label: 'Get it done now!!!',
        start_date: '02/02/2023',
        end_date:   '01/05/2024'
      },
    ];

    return of(data);
  }



  public getAllReports2(): Observable<GridCellDataForSearchingFiltersDTO[]> {
    let data: GridCellDataForSearchingFiltersDTO[] = [
      {
        id: 101,
        report_name: 'Report #1',
        priority_label: 'Critical',
        start_date: '11/09/2023',
        end_date:   '09/05/2024'
      },
      {
        id: 102,
        report_name: 'Report #2',
        priority_label: 'Critical',
        start_date: '04/01/2022',
        end_date:   '05/02/2023'
      },
      {
        id: 103,
        report_name: 'Report #3',
        priority_label: 'Get it done now!!!',
        start_date: '02/02/2023',
        end_date:   '01/05/2024'
      },
    ];

    return of(data);
  }

}
