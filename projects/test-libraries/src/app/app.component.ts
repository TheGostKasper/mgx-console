import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingService } from 'mgx-loading-and-error';
import { IMenuItem } from 'mgx-multi-select';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  items: IMenuItem[] = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
    { id: '4', name: 'Option 4' }
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
