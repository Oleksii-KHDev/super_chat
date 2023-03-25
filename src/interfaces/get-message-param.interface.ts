import { SortField, SortOrder } from '../types/message.types.js';

export interface IGetMessageParam {
  amount: number;
  offset: number;
  sortField: SortField;
  sortOrder: SortOrder;
}
