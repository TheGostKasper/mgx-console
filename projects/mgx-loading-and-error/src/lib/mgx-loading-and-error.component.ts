import { Component, Input } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, share } from 'rxjs/operators';

export interface ILoadingErrorConfig {
  loading: boolean;
  error: boolean;
  overlayLoading?: boolean;
  fetchFn: () => Observable<any> | void;
  noData?: boolean;
}
export interface IPayload {
  filters?: string[] | any;
  group_by?: string;
  limit?: number;
  page?: number;
  type?: string;
  sort_by?: string;
  sort_direction?: string;
  [keys: string]: any;
}
export class LoadingService<T> {
  loading = false;
  error = false;
  noData = false;
  data?: T;
  data$!: Observable<T>;
  payLoad?: IPayload = {
    page: 1,
    limit: 10,
    sort_direction: 'desc',
  };

  fetchFn!: (args?: any) => Observable<any> | void;
  actions?: {
    delete: (args?: any) => void;
    [keys: string]: (args?: any) => void | Observable<any>;
  };
  constructor() {}

  loadError(fetchFn: Observable<T>) {
    this.loading = true;
    this.error = false;
    return fetchFn.pipe(
      catchError((err) => {
        this.error = true;
        this.loading = false;
        return throwError(err);
      }),
      finalize(() => {
        this.loading = false;
      }),
      share()
    );
  }
}

@Component({
  selector: 'mgx-loading-and-error',
  template: `
    <div class="u-width-100 u-height-100" *ngIf="!loadingErrorConfig.loading">
      <div
        *ngIf="loadingErrorConfig.error && !isInline"
        class="u-padding-large"
      >
        <div>
          <div class="flex-center icon-container">
            <mat-icon class="mat-icon-error">close</mat-icon>
          </div>
          <span class="flex-center">{{ generalErrorMessage }}</span>
          <div class="flex-center">
            <button
              mat-button
              aria-label="reload"
              color="primary"
              (click)="reloadFn()"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
      <div *ngIf="loadingErrorConfig.error && isInline" class="u-padding-tiny">
        <div class="flex-center">
          <span>Couldn't load</span>
          <mat-icon
            class="mat-icon-load"
            (click)="reloadFn()"
            matTooltip="Retry"
            >refresh</mat-icon
          >
        </div>
      </div>
      <div class="flex-center u-height-100" *ngIf="!loadingErrorConfig.error">
        <ng-content></ng-content>
      </div>
    </div>
    <div
      class="flex-center u-padding-large"
      [ngStyle]="{ 'height.px': loadingContainerHeight }"
      *ngIf="loadingErrorConfig.loading"
    >
      <mat-progress-spinner
        mode="indeterminate"
        diameter="{{ loadingDiameter }}"
      >
      </mat-progress-spinner>
    </div>
  `,
  styles: [
    `
      .icon-container {
        margin: 0 8px 0 8px;
      }
      .u-width-100 {
        width: 100%;
      }
      .u-height-100 {
        height: 100%;
      }
      .u-padding-large {
        padding: 32px;
      }
      .mat-icon-error {
        padding: 5px;
        border: 2px solid #e2423b;
        border-radius: 50%;
        color: #e2423b;
      }

      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .mat-icon-load {
        color: #e2423b;
        cursor: pointer;
        margin-left: 8px;
      }
    `,
  ],
})
export class MgxLoadingAndErrorComponent {
  @Input() loadingErrorConfig!: ILoadingErrorConfig;
  @Input() isInline: boolean = false;
  @Input() loadingDiameter: number = 60;
  @Input() loadingContainerHeight: string = '';
  @Input() generalErrorMessage: string =
    "Something went wrong, Couldn't load data";

  reloadFn() {
    this.loadingErrorConfig.fetchFn();
  }
}
