import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'mgx-loading-and-error';
import { IMenuItem } from 'mgx-multi-select';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isTrue = true;
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
  itemsConfig = new LoadingService<any>();

  constructor() {
    this.itemsConfig.fetchFn = () => {
      this.itemsConfig.data$ = this.itemsConfig.loadError(this.getItems());
    };
  }
  ngOnInit(): void {
    this.itemsConfig.fetchFn();
  }

  getItems(): Observable<any> {
    return of(this.items).pipe(delay(1000));
  }
  filterChange({ value }: any) {
    console.log(value);
  }
}
