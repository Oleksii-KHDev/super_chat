export interface IMessage {
  id?: number;
  parentId: number;
  userId: number;
  text: string;
  createdAt?: Date;
  file?: string | null;
  padding?: number;
}
