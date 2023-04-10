export interface SummaryInterface {
  icon: string;
  title: string;
  defaultValue?: string | number;
  value?: string;
  isTag?: boolean;
  dataKey?: string;
  tagColors?: any;
  units?: 'number' | 'date' | 'currency';
}
