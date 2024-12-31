import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-report-grid-action-cell-renderer',
  templateUrl: './report-grid-action-cell-renderer.component.html',
  styleUrls: ['./report-grid-action-cell-renderer.component.scss']
})
export class ReportGridActionCellRendererComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams;

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

  public editClick(): void {
    // @ts-ignore
    this.params.editClicked(this.params);
  }

  public deleteClick(): void {
    // @ts-ignore
    this.params.deleteClicked(this.params);
  }


}
