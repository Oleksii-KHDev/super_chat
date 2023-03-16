export interface IDataSource {
  connect: () => unknown;
  disconnect: () => unknown;
}
