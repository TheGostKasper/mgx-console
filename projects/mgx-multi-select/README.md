# MgxMultiSelect

Angular Select component that enables multi or single select with search , easy to use and it's lite

[github page](https://github.com/TheGostKasper/mgx-console/tree/master/projects/mgx-multi-select)

## Dependencies

- @angular/material (make sure you are using angular material theme )

## Usage

Import MgxMultiSelectModule into your @NgModule.

```
import { MgxMultiSelectModule } from 'mgx-multi-select';

@NgModule({
  // ...
  imports: [
    MgxMultiSelectModule,
  ]
  // ...
})
```

Define Items and onFilterChange in your consuming component:

```
import { IMenuItem } from 'mgx-multi-select';

export class MyClass implements OnInit {
    items: IMenuItem[];

    ngOnInit() {
        this.items = [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
        ];
    }

    filterChange({ value }: any) {
        console.log(value);
    }
}
```

In your template, use the component directive:

```
 <mgx-multi-select-menu
    [items]="items"
    caption="Test"
    (filterChange)="filterChange($event)"
  ></mgx-multi-select-menu>

```

Up and running with Grouped Items

```
import { IMenuItem } from 'mgx-multi-select';

export class MyClass implements OnInit {
    items: IMenuItem[] = [
    {
      id: '1',
      name: 'Option 1',
      subItems: [
        { id: '1.1', name: 'Option 1.1' },
        { id: '1.2', name: 'Option 1.2' },
        { id: '1.3', name: 'Option 1.3' },
        { id: '1.4', name: 'Option 1.4' },
      ],
    },
    {
      id: '2',
      name: 'Option 2',
      subItems: [
        { id: '2.1', name: 'Option 2.1' },
        { id: '2.2', name: 'Option 2.2' },
        { id: '2.3', name: 'Option 2.3' },
        { id: '2.4', name: 'Option 2.4' },
      ],
    },
    {
      id: '3',
      name: 'Option 3',
      subItems: [
        { id: '3.1', name: 'Option 3.1' },
        { id: '3.2', name: 'Option 3.2' },
        { id: '3.3', name: 'Option 3.3' },
        { id: '3.4', name: 'Option 3.4' },
      ],
    },
    {
      id: '4',
      name: 'Option 4',
      subItems: [
        { id: '4.1', name: 'Option 4.1' },
        { id: '4.2', name: 'Option 4.2' },
        { id: '4.3', name: 'Option 4.3' },
        { id: '4.4', name: 'Option 4.4' },
      ],
    },
  ];

    ngOnInit() {}

    filterChange({ value }: any) {
        console.log(value);
    }
}

```

In your template, use the component directive:

```
  <mgx-multi-select-menu
        [items]="items"
        caption="Standards"
        [showSelectAll]="isTrue"
        [isGrouped]="isTrue"
        (filterChange)="filterChange($event)"
      >
      </mgx-multi-select-menu>
```

# Customize Item display

```
  <mgx-multi-select-menu
        [items]="items"
        caption="Standards"
        [showSelectAll]="isTrue"
        [isGrouped]="isTrue"
        (filterChange)="filterChange($event)"
      >
        <ng-template #optionTemplate let-item>
          <div fxLayout="row" fxFlexAlign="start end" class="u-width-100">
          <!-- Here you can customize displayed items -->
            {{item.id}} - {{ item.name }}
          </div>
        </ng-template>
      </mgx-multi-select-menu>

```

## Settings

| Input              | Description                                                                                 | Default Value |
| ------------------ | ------------------------------------------------------------------------------------------- | ------------- |
| `caption`          | Placeholder for the dropdown                                                                | ""            |
| `items`            | Array of {id:string,name:string} that defines options                                       | []            |
| `filtereditems`    | array of **filteredIds** `string ids`                                                       | []            |
| `capitalize`       | controls text-transformation in case you want to capitalize options                         | false         |
| `showLabels`       | Controls if you want to show selected items on a chipList input                             | false         |
| `isSearchable`     | Control search input visibility                                                             | true          |
| `isGrouped`        | Display grouped items                                                                       | false         |
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
