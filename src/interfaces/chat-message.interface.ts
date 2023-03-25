import { IMessage } from './message.interface.js';
import { IUser } from './user.interface.js';

export type IChatMessage = IMessage & { user: IUser };
