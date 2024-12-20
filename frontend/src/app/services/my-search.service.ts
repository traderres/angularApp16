import { Injectable } from '@angular/core';
import {SavedSearchDTO} from "../models/saved-search-dto";
import {Observable, of} from "rxjs";
import {GridSortingRowDataDTO} from "../models/grid-sorting-row-data-dto";
import {GridCellRendererRowDataDTO} from "../models/grid-cell-renderer-row-data-dto";

@Injectable({
  providedIn: 'root'
})
export class MySearchService {

  constructor() { }

  public getUsersSavedSearches(): Observable<SavedSearchDTO[]> {
    let data: SavedSearchDTO[] = [
      {
        id: 1,
        name: 'Reported created in 2024',
        search_query: "created_date >= '01/01/2024'",
        last_executed_date: '07/01/2024'
      },

      {
        id: 2,
        name: 'Most popular reports',
        search_query: "most_popular(report)",
        last_executed_date: '07/02/2024'
      },
      {
        id: 3,
        name: 'Reported created in 2023',
        search_query: "created_date >= '01/01/2023 AND created_date < 01/01/2024'",
        last_executed_date: '07/05/2024'
      },
    ];

    return of(data);
  }



  public getAllContracts(): Observable<GridSortingRowDataDTO[]> {
    let data: GridSortingRowDataDTO[] = [
      {
        id: 1,
        contract_name: 'Contract #1',
        cage_code:   '6KY98',
        start_date: '02/01/2023',
        end_date: '09/05/2024'
      },

      {
        id: 2,
        contract_name: 'Contract #2',
        cage_code:  '66F66',
        start_date: '11/05/2023',
        end_date: '02/06/2024'
      },
      {
        id: 3,
        contract_name: 'Contract #3',
        cage_code:  'ABCDE',
        start_date: '01/05/2024',
        end_date: '01/01/2025'
      },
    ];

    return of(data);
  }

  public getAllUsers(): Observable<GridCellRendererRowDataDTO[]> {
    let data: GridCellRendererRowDataDTO[] = [
      {
        id: 101,
        full_name: 'Han Solo',
        registration_status_text: 'Approved Registration',
        registration_status_id: 3,
        registration_date: '02/01/2023'
      },
      {
        id: 102,
        full_name: 'Kylo Ren',
        registration_status_text: 'Pending Registration',
        registration_status_id: 1,
        registration_date: '02/06/2023'
      },
      {
        id: 103,
        full_name: 'Poe Dameron',
        registration_status_text: 'Pending Registration',
        registration_status_id: 1,
        registration_date: '01/01/2025'
      },
    ];

    return of(data);
  }

}
