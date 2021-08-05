import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ContentChild,
  TemplateRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IGroupConfig, IMenuItem } from './shared/shared.models';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'mgx-multi-select-menu',
  templateUrl: './multi-select-menu.component.html',
  styleUrls: ['multi-select-menu.component.scss'],
})
export class MgxMultiSelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() caption: string = '';
  @Input() items: IMenuItem[] = [];
  @Input() filtereditems: string[] = [];
  @Input() capitalize = false;
  @Input() showLabels = false;
  @Input() isSearchable = true;
  @Input() isMultipleSelect = true;
  @Input() disabled = false;
  @Input() showSelectAll = false;
  @Input() isGrouped = false;
  @Output() filterChange: EventEmitter<any> = new EventEmitter();

  @ContentChild('optionTemplate', { static: false })
  optionTemplateRef!: TemplateRef<any>;

  selectedItems: IMenuItem[] = [];
  globalItems: IMenuItem[] = [];
  savedItems: IMenuItem[] = [];

  searchItems = new FormControl();
  itemsSelected = new FormControl();
  isSelectAll = false;

  @ViewChild('itemInput')
  itemInput!: ElementRef<HTMLInputElement>;
  @ViewChild('select', { static: false }) select!: ElementRef<any>;

  subs$!: Subscription;
  config!: IGroupConfig;
  constructor() {
    const search$ = this.searchItems.valueChanges
      .pipe(
        debounceTime(500),
        tap((searchValue) => {
          this.updateSelectAllStatus();

          if (!this.isGrouped) {
            if (!!searchValue) {
              this.savedItems = this.savedItems.filter((e) =>
                e.name
                  .toLocaleLowerCase()
                  .includes(searchValue.toLocaleLowerCase())
              );
            } else {
              this.savedItems = [...this.selectedItems];
            }

            const filteredItems = this.globalItems.filter((e) =>
              e.name
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
            );
            this.items = filteredItems.filter(
              (gItems) => !this.savedItems.includes(gItems)
            );
          } else {
            this.items = this.globalItems.map((e) => ({
              id: e.id,
              name: e.name,
              subItems: e.subItems?.filter((itm) =>
                itm.name
                  .toLocaleLowerCase()
                  .includes(searchValue.toLocaleLowerCase())
              ),
            }));
          }
          this.isSelectAll=this.updateSelectAllStatus()
          this.itemsSelected.setValue(this.selectedItems);
        })
      )
      .subscribe();
    this.subs$?.add(search$);
  }
  private setFilterChangeItems(items: IMenuItem[] | IMenuItem) {
    this.itemsSelected.setValue(items);
    this.filterChange.emit({ value: items });
  }
  private applySingleSelection(item: IMenuItem): void {
    if (item.id === this.selectedItems[0]?.id) return;
    else {
      this.selectedItems = [item];
      this.setFilterChangeItems(this.selectedItems);
    }
  }
  private applyMultiSelect(item: any) {
    if (this.selectedItems.filter((e) => e.id === item.id)[0]) {
      this.selectedItems = this.selectedItems.filter((e) => e.id != item.id);
    } else {
      this.selectedItems.push(item);
    }
    this.setFilterChangeItems(this.selectedItems);
  }
  private setItemsSelected() {
    this.selectedItems =
      this.filtereditems?.length > 0
        ? this.getMappedItems(this.filtereditems)
        : [];
    const itemToSet = !!this.isMultipleSelect
      ? this.selectedItems
      : this.selectedItems[0];
    this.itemsSelected.setValue(itemToSet);
  }
  private getMappedItems(ids: Array<any>) {
    const items = this.globalItems.filter((e) => ids.includes(e.id));
    return items;
  }

  ngOnDestroy(): void {
    this.subs$?.unsubscribe();
  }

  ngOnChanges({ filtereditems }: SimpleChanges): void {
    if (
      !!filtereditems &&
      !!filtereditems.previousValue &&
      filtereditems.currentValue != filtereditems.previousValue
    ) {
      this.setItemsSelected();
    }
  }

  ngOnInit(): void {
    this.globalItems = this.items;
    this.setItemsSelected();
  }
  openedChange(event: boolean) {
    if (!event) {
      this.savedItems = [...this.selectedItems];
      if (this.isGrouped) {
        this.items = this.globalItems.map((gItems) => {
          const subItems = gItems.subItems?.filter(
            (e) => !this.savedItems.find((ele) => ele.id === e.id)
          );
          return {
            id: gItems.id,
            name: gItems.name,
            subItems,
          };
        });
      } else {
        this.items = this.globalItems.filter(
          (gItems) => !this.savedItems.includes(gItems)
        );
      }
    }
  }
  selectionChange({ isUserInput }: any, item: IMenuItem) {
    if (isUserInput) {
      if (this.isMultipleSelect === true) {
        this.applyMultiSelect(item);
      } else {
        this.applySingleSelection(item);
      }
      this.isSelectAll = this.updateSelectAllStatus();
    }
  }
  private updateSelectAllStatus(): boolean {
    const targetLength = this.isGrouped
      ? this.items.map((e) => e.subItems as IMenuItem[]).flat().length
      : this.items.length;

    return this.selectedItems.length + this.savedItems.length === targetLength;
  }

  selectAllChange({ checked }: MatCheckboxChange) {
    this.isSelectAll = checked;
    const items: IMenuItem[] = this.isGrouped
      ? this.items.map((e) => e.subItems as IMenuItem[]).flat()
      : this.items;
    const svdItems = this.savedItems as IMenuItem[];
    this.selectedItems = !checked
      ? []
      : [...new Set([...items, ...svdItems, ...this.selectedItems])];

    this.itemsSelected.setValue(this.selectedItems);
    this.filterChange.emit({ value: this.selectedItems });
  }

  remove(item: IMenuItem) {
    this.selectionChange({ isUserInput: true }, item);
  }
  clearSearch() {
    this.searchItems.setValue('');
    this.items = this.globalItems;
    this.isSelectAll = this.updateSelectAllStatus();
  }
  clearSelection() {
    this.clearFormCntroles();
    this.filterChange.emit({ value: [] });
  }
  clearFormCntroles() {
    this.searchItems.setValue('');
    this.itemsSelected.setValue([]);
    this.selectedItems = [];
    this.isSelectAll = this.updateSelectAllStatus();
  }
  handleInput(event: KeyboardEvent): void {
    event.stopPropagation();
  }
}
