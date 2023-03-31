export interface ITableColumnInterface {
  // searchType: any;
  // searchTypeVal: any;
  name: string;
  dataKey: string;
  position?: 'right' | 'left' | 'center';
  isSortable?: boolean;
  isBoolean?: boolean;
  units?: 'date' | 'number' | 'time' | 'currency';
  hasActions?: boolean;
  searchKey?: string;
  searchType?: 'enum';
  searchTypeVal?: any[];
  case?: 'caps' | 'small' | 'titlecase';
}

export interface ITableSearchFiltersInterface {
  name: string;
  value: string | number;
  searchValue?: string | number;
  searchType?: 'enum';
  searchTypeVal?: any[];
}

export interface ITableRowActions {
  element: any;
  action: any;
}
