import { SortField, SortOrder, ORDER_SORTING } from './types/message.types.js';

export const CORS_SETTINGS = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
export const RETURNS_MESSAGE_COUNT = 25;

export const DEFAULT_ORDER_SORTING: ORDER_SORTING = {
  sortField: SortField.createdAt,
  sortOrder: SortOrder.desc,
};
