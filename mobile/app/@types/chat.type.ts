import { UserType } from "./auth.type";
import { MessageType } from "./message.type";

export interface ChatType {
  _id: string;
  participants: UserType[];
  lastMessage?: MessageType | null;
  isGroup: boolean;
  groupName?: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
