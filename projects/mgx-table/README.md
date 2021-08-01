# MgxTable

Angular generic table component that easy to use [github page](https://github.com/TheGostKasper/mgx-console/tree/master/projects/mgx-table)

## Dependencies

- @angular/material
- @angular/flex-layout
- mgx-loading-and-error

## Usage

Import MgxTableModule into your @NgModule.

```
import { MgxMultiSelectModule } from 'mgx-multi-select';

@NgModule({
  // ...
  imports: [
    MgxTableModule,
  ]
  // ...
})
```

Define Items and onFilterChange in your consuming component:

```
import { IMenuItem } from 'mgx-multi-select';

export class MyClass implements OnInit {

    listConfig = new LoadingService<any>();
    listService = new BaseTableService(this.listConfig, () => this.getlistConfig(this.listConfig.payLoad));


constructor() {
    this.listConfig.fetchFn = () => {
      this.listConfig.data$ = this.loadEntityList(this.listConfig.loadError(this.getListConfig(obj.payLoad)));
    };
  }

 getListConfig(payload: IPayload) {
   return from({
        data:[
            { id: 1, name: 'Name 1',title:'title 1' },
            { id: 2, name: 'Name 2',title:'title 2' },
            { id: 3, name: 'Name 3',title:'title 3' },
            { id: 4, name: 'Name 4',title:'title 4' },
        ],
        count:4,
        has_next: false,
        limit: 10,
        page: 1
    })
  }

 onPageChange(event) {
    this.entityListConfig = this.entityListService.onTableNextPage(event);
  }
  onFilterList(payLoad: IPayload) {
    this.entityListConfig = this.entityListService.onFilterTable(payLoad);
  }

 displayedColumns=['name','title','status']
  displayedRows = [
    {
      key: 'name',
      value: 'name',
      title: 'Name',
      isLinkable: true,
      routeConfig: {
        getRouterLink: (ele) => [ele.id],
        getQueryParams: (ele) => {},
      },
    },
    { key: 'title', value: 'title', title: 'TITLE' },
    { key: 'status', value: 'status', title: 'STATUS'},

  ];
}
```

In your template, use the component directive:

```
 <app-loading-and-error class="u-width-100" [loadingErrorConfig]="listConfig">
      <ng-container *ngIf="listConfig.data$ | async as dataSource">
        <mgx-table
            [responseObj]="dataSource"
            [displayedColumns]="displayedColumns"
            [pageConfig]="listConfig.payLoad"
            (filterPage)="onFilterList($event)"
            (pageChange)="onPageChange($event)"
            class="u-width-100"
          >
        </mgx-table>
    </ng-container>
</app-loading-and-error>
```

## Settings

| Input              | Description                                                                                 | Default Value |
| ------------------ | ------------------------------------------------------------------------------------------- | ------------- |
| `caption`          | Placeholder for the dropdown                                                                | empty         |
| `items`            | Array of {id:string,name:string} that defines options                                       | []            |
| `filtereditems`    | array of **filteredIds** `string ids`                                                       | []            |
| `capitalize`       | controls text-transformation in case you want to capitalize options                         | false         |
| `showLabels`       | Controls if you want to show selected items on a chipList input                             | false         |
| `isSearchable`     | Control search input visibility                                                             | true          |
| `isMultipleSelect` | Control selection To set the dropdown for single item selection only or multiple selection. | true          |
| `disabled`         | Disable the dropdown                                                                        | false         |
| `showSelectAll`    | A 'select all' checkbox to select all filtered results                                      | false         |
| `filterChange`     | EventEmitter that listen to value changes                                                   | --            |

## Keywords

[angular 2](https://www.npmjs.com/search?q=keywords:angular%202)
[dropdown](https://www.npmjs.com/search?q=keywords:dropdown)
[multi select](https://www.npmjs.com/search?q=keywords:multi%20select)
[angular 2 multiselect dropdown](https://www.npmjs.com/search?q=keywords:angular%202%20multiselect%20dropdown)
[search multiselect dropdown](https://www.npmjs.com/search?q=keywords:search%20multiselect%20dropdown)
