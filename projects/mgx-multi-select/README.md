# MgxMultiSelect

Angular multiselect dropdown component that easy to use  

## Dependencies

- @angular/material 
- @angular/flex-layout

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


## Settings

| Input | Description | Default Value |
| --- | --- | --- |
| `caption` | Placeholder for the dropdown | empty |
| `items` | Array of {id:string,name:string} that defines options | []
| `filtereditems` | array of filteredItems  | []
| `capitalize` | controls text-transformation in case you want to capitalize options | false
| `showLabels` | Controls if you want to show selected items on a chipList input| false
| `isSearchable` | Control search input visibility | true
| `isMultipleSelect` | Control selection To set the dropdown for single item selection only or multiple selection.  | true
| `disabled` | Disable the dropdown | false
| `showSelectAll` | A 'select all' checkbox to select all filtered results | false
| `filterChange` | EventEmitter that listen to value changes | --


## Keywords

[angular 2](https://www.npmjs.com/search?q=keywords:angular%202)
[dropdown](https://www.npmjs.com/search?q=keywords:dropdown)
[multi select](https://www.npmjs.com/search?q=keywords:multi%20select)
[angular 2 multiselect dropdown](https://www.npmjs.com/search?q=keywords:angular%202%20multiselect%20dropdown)
[search multiselect dropdown](https://www.npmjs.com/search?q=keywords:search%20multiselect%20dropdown)
