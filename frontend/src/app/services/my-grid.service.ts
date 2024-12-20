import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {GridWithFiltersRowDTO} from "../models/grid-with-filters-row-dto";

@Injectable({
  providedIn: 'root'
})
export class MyGridService {

  constructor() { }

  public getAllReports(): Observable<GridWithFiltersRowDTO[]> {
    let data: GridWithFiltersRowDTO[] = [
      {
        id: 1,
        report_name: 'Report #1',
        indicator_count: 27,
        last_updated_date: '07/01/2024'
      },
      {
        id: 2,
        report_name: 'Report #2',
        indicator_count: 54,
        last_updated_date: '09/01/2024'
      },
      {
        id: 3,
        report_name: 'Report #3',
        indicator_count: 81,
        last_updated_date: '11/01/2023'
      },
    ];

    return of(data);
  }
}
