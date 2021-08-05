import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { IGroupConfig, IMenuItem } from '../shared/shared.models';

@Component({
  selector: 'mgx-select-view',
  template: `
    <ng-container *ngIf="config.isGrouped">
      <ng-container *ngFor="let item of items">
        <span class="u-padding-left-tiny">{{ item.name }}</span>
        <mat-option
          *ngFor="let ele of item.subItems"
          [value]="ele"
          class="option"
          (onSelectionChange)="config.selectionChange($event, ele)"
        >
          <ng-container
            [ngTemplateOutlet]="optionTemplateRef || defaultTemplate"
            [ngTemplateOutletContext]="{ $implicit: ele }"
          >
          </ng-container>
          <ng-template #defaultTemplate let-ele>{{ ele.name }}</ng-template>
        </mat-option>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="!config.isGrouped">
     <mgx-saved-items-view [items]="items" [config]="config"></mgx-saved-items-view>
    </ng-container>
  `,
})
export class MgxSelectViewComponent {
  @Input() items: IMenuItem[] = [];
  @Input() config!: IGroupConfig;

  @ContentChild('optionTemplate', { static: false })
  optionTemplateRef!: TemplateRef<any>;
}

@Component({
  selector: 'mgx-saved-items-view',
  template: `
    <mat-option
      *ngFor="let item of items"
      [value]="item"
      class="option"
      (onSelectionChange)="config.selectionChange($event, item)"
    >
      <ng-container
        [ngTemplateOutlet]="optionTemplateRef || defaultTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }"
      >
      </ng-container>
      <ng-template #defaultTemplate let-item>{{ item.name }}</ng-template>
    </mat-option>
  `,
})
export class MgxSavedItemsViewComponent {
  @Input() items: IMenuItem[] = [];
  @Input() config!: IGroupConfig;

  @ContentChild('optionTemplate', { static: false })
  optionTemplateRef!: TemplateRef<any>;
}
