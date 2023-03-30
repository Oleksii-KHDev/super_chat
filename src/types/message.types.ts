export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
export enum SortField {
  createdAt = 'createdAt',
  email = 'email',
  'user.email' = 'user.email',
}

export type ORDER_SORTING = {
  sortField: SortField;
  sortOrder: SortOrder;
};
