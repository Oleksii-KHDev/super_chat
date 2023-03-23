import { IMessage } from './message.interface.js';
import { IUser } from './user.interface.js';

export interface IChatMessage {
  message: IMessage;
  user: IUser;
}
