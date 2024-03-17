export interface TableRow {
  [key: string]: string | number;
}

export interface TableProps {
  data: TableRow[];
}
