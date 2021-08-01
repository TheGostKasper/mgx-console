import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BaseTableComponent } from './mgx-base-table';

interface IRouteConfig {
  getRouterLink: (args: any) => string[];
  getQueryParams: (ele: any) => any;
}
export interface IRow {
  key: string;
  value: string;
  title: string;
  isLinkable?: boolean;
  routeConfig?: IRouteConfig;
}

@Component({
  selector: 'lib-mgx-table',
  templateUrl: './mmgx-table.component.html',
  styles: [],
})
export class MgxTableComponent
  extends BaseTableComponent<any>
  implements OnInit
{
  @Input() displayedRows: any;
  constructor(public changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  ngOnInit(): void {}
}
