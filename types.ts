export enum DocStatus {
  PENDING = 'PENDING',
  OK = 'OK',
  NA = 'NA' // Not Applicable
}

export interface DocumentItem {
  id: string;
  text: string;
  status: DocStatus;
}

export interface Category {
  id: string;
  title: string;
  items: DocumentItem[];
}

export interface AppState {
  categories: Category[];
  lastUpdated: string;
}