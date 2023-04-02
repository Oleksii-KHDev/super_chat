/**
 * @type {SortOrder} Message sorting order
 */
export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

/**
 * @type {SortField} Message sorting fields
 */
export enum SortField {
  createdAt = 'createdAt',
  email = 'email',
  'user.email' = 'user.email',
}

/**
 * @type {ORDER_SORTING} Sorting object. Contains information about sorting criteria
 */
export type ORDER_SORTING = {
  sortField: SortField;
  sortOrder: SortOrder;
};
