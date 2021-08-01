import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort, MatSort } from '@angular/material/sort';

interface IPayload {
  limit?: number;
  page?: number;
  sort_by?: string;
  sort_direction?: string;
  [keys: string]: any;
}

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<T> implements OnInit, AfterViewInit {
  @Input()
  responseObj!: { data: T[]; has_next: boolean; count: number };
  @Input() displayedColumns!: string[];
  @Input() noDataMessage = 'There is no data to display';
  @Input() pageConfig!: IPayload;
  @Output() filterPage: EventEmitter<IPayload> = new EventEmitter();
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<T>;
  pageSize = 10;
  currentSort!: string;

  constructor(public changeDetector: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageIndex = (this.pageConfig.page || 1) - 1;
      this.paginator.pageSize = this.pageConfig.limit || 10;
      this.currentSort = this.pageConfig.sort_by || 'desc';
      this.checkSortableDirection();
    }
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.dataSource = new MatTableDataSource<T>(this.responseObj.data);
  }
  paginate(event: any) {
    this.pageChange.emit(event);
  }
  startFilter({ sort_by, sort_direction }: any) {
    let payLoad = {
      sort_direction: sort_direction,
      sort_by: sort_by,
    };
    this.filterPage.emit(payLoad);
  }
  checkSortableDirection() {
    if (this.sort) {
      this.sort.sortables.forEach((element) => {
        element.start =
          element.id === this.currentSort
            ? this.pageConfig?.sort_direction === 'asc'
              ? 'desc'
              : 'asc'
            : 'desc';
      });
    }
  }
  sortData(sort: Sort) {
    const sortObj = { sort_by: sort.active, sort_direction: sort.direction };
    this.startFilter(sortObj);
  }

  preventAction(event: any, routeConfig: any, element: any) {
    event.stopPropagation();
    routeConfig.navigate(element);
  }
}
