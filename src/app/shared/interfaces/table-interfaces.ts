export interface TableColumnInterface {
  name: string;
  dataKey: string;
  position?: 'right' | 'left' | 'center';
  isSortable?: boolean;
  units?: 'litres' | 'date' | 'currency' | 'number' | 'time';
  hasActions?: boolean;
  searchKey?: string;
  cellCase?: 'titlecase' | 'uppercase' | 'lowercase' | 'sentencecase';
}

export interface TableFiltersInterface {
  name: string;
  value: string | number;
  searchValue?: string | number;
}
