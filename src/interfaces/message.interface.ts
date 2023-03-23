export interface IMessage {
  parentId: number;
  userId: number;
  text: string;
  createdAt?: string;
  file?: string;
}
