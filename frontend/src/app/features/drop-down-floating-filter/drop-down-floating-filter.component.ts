import { Component } from '@angular/core';
import {AgFrameworkComponent} from "ag-grid-angular";
import {FilterChangedEvent, IFloatingFilter, IFloatingFilterParams, TextFilter} from "ag-grid-community";

@Component({
  selector: 'app-drop-down-floating-filter',
  templateUrl: './drop-down-floating-filter.component.html',
  styleUrls: ['./drop-down-floating-filter.component.scss']
})
export class DropDownFloatingFilterComponent implements IFloatingFilter, AgFrameworkComponent<any>{
  public params: IFloatingFilterParams;
  public currentValue: null | string = null;


  public agInit(aParams: any): void {
    this.params = aParams;
  }


  public onParentModelChanged(parentModel: any, filterChangedEvent?: FilterChangedEvent | null): void {
    // When the filter is empty we will receive a null value here
    if (!parentModel) {
      this.currentValue = null;
    }
    else {
      this.currentValue = parentModel.filter;
    }
  }


  /*
   * User selected a dropdown value in the filter
   *   If the user cleared the filter, set an empty filter in the parent grid
   *   If the user selected an option, set the filter in the parent grid
   */
  public onSelectionChanged() {
    if (this.currentValue == null) {
      // User cleared the filter

      this.params?.parentFilterInstance((instance: any) => {
        // The user selected a null value.  So, *REMOVE* the filter
        instance.onFloatingFilterChanged('equals', null);
      });
    }
    else {
      // Filter has a value
      this.params?.parentFilterInstance((instance: any) => {
        // The user selected a non-null value.  So, *APPLY* the filter
        instance.onFloatingFilterChanged('equals', this.currentValue);
      });
    }

  }  // end of onSelectionChanged()


}
