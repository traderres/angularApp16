import { Injectable } from '@angular/core';
import {GridCellDataForCustomFilterDTO} from "../models/grid-cell-data-for-custom-filter-dto";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyUserService {

  constructor() { }


  public getAllUsers2(): Observable<GridCellDataForCustomFilterDTO[]> {
    let data: GridCellDataForCustomFilterDTO[] = [
      {
        id: 1001,
        full_name: 'John Smith',
        is_locked: false,
        is_locked_label: 'Unlocked',
        registration_date: '09/05/2024',
        last_login_date:   '09/15/2024'
      },
      {
        id: 1002,
        full_name: 'Ben Smith',
        is_locked: true,
        is_locked_label: 'Locked',
        registration_date: '11/05/2024',
        last_login_date:   '11/15/2024'
      },
      {
        id: 1003,
        full_name: 'Ben Smith',
        is_locked: false,
        is_locked_label: 'Unlocked',
        registration_date: '12/05/2023',
        last_login_date:   '12/15/2023'
      },
    ];

    return of(data);
  }

}
