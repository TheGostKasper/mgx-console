# MgxLoadingAndError

> Angular Loading and Error component that display progress-spinning till fetchFn is successfully return data otherwise is shows an error message with the ability to reloadFn

[github page](https://github.com/TheGostKasper/mgx-console/tree/master/projects/mgx-loading-and-error) 
<hr>

## Dependencies

- @angular/material
<hr>

## Usage
<hr>
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
<hr>

## Settings
<hr>

| Input | Description | Default Value |
| --- | --- | --- |
| `loadingErrorConfig` |  { <br>loading: boolean; <br> error: boolean;<br> overlayLoading: boolean;<br>fetchFn: () => Observable<any>  void;noData: boolean; <br>} <br> controls component status of loading and error |  |
| `isInline` | Display error message alongside icon in oneline | false |
| `loadingDiameter` | Set loading diameter of spinning-progress-bar | 60 |
| `loadingContainerHeight` | controls height of the loading-component | '' |
| `generalErrorMessage` | Display Default Error Message if ther's an error | Something went wrong, Couldn't load data |


<hr>

> LoadingService responsible for setting default values and make a loadError fn that control `loading-error` status

```
class LoadingService<T> {
  loading = false;
  error = false;
  noData = false;
  overlayLoading?: boolean;
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
```
# features of using LoadingService class
- You can control payload from loadingService class by accessing the `payLoad` obj 
- `actions ` is set to contains a generic  `[keys: string]: (args?: any) => void | Observable<any>` to handle any other functions you may need to pass and use  


# The Why of IPayload interface

```
interface IPayload {
  filters?: string[] | any;
  group_by?: string;
  limit?: number;
  page?: number;
  type?: string;
  sort_by?: string;
  sort_direction?: string;
  [keys: string]: any; // enables to set any others key-value of the request you want to use 
}
```
- Easy to handle from the service once you init <br> `itemsConfig = new LoadingService<any>();`<br> `itemsConfig.payload= { // (add | update | delete) attrs } `

## Keywords

[angular 2](https://www.npmjs.com/search?q=keywords:angular%202)
[loading](https://www.npmjs.com/search?q=keywords:loading)
[loading error](https://www.npmjs.com/search?q=keywords:loading%20error)
[spinning](https://www.npmjs.com/search?q=keywords:spinning)
[progress](https://www.npmjs.com/search?q=keywords:progress)
[progressbar](https://www.npmjs.com/search?q=keywords:progressbar)


