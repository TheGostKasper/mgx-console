# MgxLoadingAndError

> Angular Loading and Error component that display progress-spinning till fetchFn is successfully return data otherwise is shows an error message with the ability to reloadFn

## Dependencies

- @angular/material

## Usage

Import MgxLoadingAndErrorModule into your @NgModule.

```
import { MgxLoadingAndErrorModule } from 'mgx-loading-and-error';

@NgModule({
  // ...
  imports: [
    MgxLoadingAndErrorModule,
  ]
  // ...
})
```

Define LoadingErrorConfiguration in your consuming component:

```
import { LoadingService } from 'mgx-multi-select';

export class MyClass implements OnInit {
   itemsConfig = new LoadingService<any>();

  constructor() {
    this.itemsConfig.fetchFn = () => {
      this.itemsConfig.data$ = this.itemsConfig.loadError(
          this.getItems()
          );
    };
  }

    ngOnInit() {
        // call itemsConfig.fetchFn()  whenever | wherever you want to start listening and fetching data
         this.itemsConfig.fetchFn();
    }

    getItems():Observable<any> {
        // call your endpoint 
       return of(
        [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
        ]
       )
    }
}
```
 In your template, use the component directive:

```
 <mgx-loading-and-error [loadingErrorConfig]="itemsConfig">
     <ng-container *ngIf="itemsConfig.data$ | async as items">
          
        <p> {{item.id}} - {{item.name}}</p>

    </ng-container>
</mgx-loading-and-error>

```

## Settings

| Input | Description | Default Value |
| --- | --- | --- |
| `loadingErrorConfig` |  { <br>loading: boolean; <br> error: boolean;<br> overlayLoading: boolean;<br>fetchFn: () => Observable<any>  void;noData: boolean; <br>} <br> controls component status of loading and error |  |
| `isInline` | Display error message alongside icon in oneline | false |
| `loadingDiameter` | Set loading diameter of spinning-progress-bar | 60 |
| `loadingContainerHeight` | controls height of the loading-component | '' |
| `generalErrorMessage` | Display Default Error Message if ther's an error | Something went wrong, Couldn't load data |