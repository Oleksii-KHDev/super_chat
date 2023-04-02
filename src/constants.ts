import { SortField, SortOrder, ORDER_SORTING } from './types/message.types.js';

/**
 * Cors settings
 */
export const CORS_SETTINGS = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

/**
 * Default count of messages in response
 */
export const RETURNS_MESSAGE_COUNT = 25;

/**
 * Default sorting
 */
export const DEFAULT_ORDER_SORTING: ORDER_SORTING = {
  sortField: SortField.createdAt,
  sortOrder: SortOrder.desc,
};
