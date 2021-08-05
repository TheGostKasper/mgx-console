import { Injectable } from '@angular/core';
import { IMenuItem } from './shared.models';

@Injectable({
  providedIn: 'root',
})
export class MgxSelectService {
  constructor() {}

  searchArray(
    searchValue: string,
    isGrouped: boolean = false,
    savedItems: Array<IMenuItem>,
    selectedItems: Array<IMenuItem>,
    globalItems: Array<IMenuItem>
  ): [Array<IMenuItem>, Array<IMenuItem>] {
    let items: Array<IMenuItem> = [];
    let svs: Array<IMenuItem> = [];
    if (!isGrouped) {
      [svs, items] = this.SearchNonGroupedFn(
        searchValue,
        savedItems,
        selectedItems,
        globalItems
      );
    } else {
      items = globalItems.map((e) => ({
        id: e.id,
        name: e.name,
        subItems: e.subItems?.filter((itm) =>
          itm.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        ),
      }));
    }

    return [svs, items];
  }

  private SearchNonGroupedFn(
    searchValue: string,
    savedItems: IMenuItem[],
    selectedItems: IMenuItem[],
    globalItems: IMenuItem[]
  ) {
    if (!!searchValue)
      savedItems = savedItems.filter(
        (e) => e.name.toLocaleLowerCase() === searchValue.toLocaleLowerCase()
      );
    else savedItems = [...selectedItems];

    const filteredItems = globalItems.filter((e) =>
      e.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    const items = filteredItems.filter(
      (gItems) => !savedItems.includes(gItems)
    );
    return [savedItems, items];
  }

  setNonGroupedSelectedItems(
    item: IMenuItem,
    selectedItems: Array<IMenuItem>
  ): Array<IMenuItem> {
    let items: Array<IMenuItem> = [];

    if (selectedItems.filter((e) => e.id === item.id)[0]) {
      items = selectedItems.filter((e) => e.id != item.id);
    } else {
      items.push(item);
    }
    return items;
  }

  setGroupedSelectedItems(
    item: IMenuItem,
    selectedItems: Array<IMenuItem>,
    groupedItem?: IMenuItem
  ): Array<IMenuItem> {
    let items: Array<IMenuItem> = [];

    if (
      selectedItems.filter((e) =>
        e.subItems?.filter((itm) => itm.id === item.id)
      )[0]
    ) {
      items = selectedItems.filter((e) =>  e.subItems?.filter((itm) => itm.id !== item.id));
    } else {
      items.push(item);
    }
    return items;
  }
}
