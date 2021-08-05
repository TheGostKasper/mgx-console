export interface IMenuItem {
  id: string;
  name: string;
  disabled?: boolean;
  subItems?: Array<{ id: string; name: string }>;
}

export interface IGroupConfig {
  isGrouped: boolean;
  selectionChange: (event: any, item: IMenuItem) => void;
}
