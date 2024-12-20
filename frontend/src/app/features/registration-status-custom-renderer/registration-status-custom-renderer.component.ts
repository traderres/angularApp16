import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-registration-status-custom-renderer',
  templateUrl: './registration-status-custom-renderer.component.html',
  styleUrls: ['./registration-status-custom-renderer.component.scss']
})
export class RegistrationStatusCustomRendererComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams;

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

}
