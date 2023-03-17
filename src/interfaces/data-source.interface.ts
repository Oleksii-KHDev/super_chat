export interface IDataSource {
  /**
   * Connect to datasource
   */
  connect: () => unknown;

  /**
   * disconnect from datasource
   */
  disconnect: () => unknown;
  /**
   * Gets client to datasource
   */
  getClient: () => object;
}
