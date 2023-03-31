interface TagConfig {
  tag?: string;
  color?: string;
}

export interface SummaryDetailsInterface {
  icon: string;
  title: string;
  defaultValue?: string | number;
  value?: string;
  isTag?: boolean;
  dataKey?: string;
  tagColors?: TagConfig[];
  units?: 'number' | 'date' | 'currency';
}
