export interface IMessage {
  parentId: number;
  userId: number;
  text: string;
  filePath?: string;
}
