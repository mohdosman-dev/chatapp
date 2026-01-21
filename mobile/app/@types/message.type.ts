import { UserType } from "./auth.type";

export interface MessageType {
  _id: string;
  chatId: string;
  sender: UserType;
  content?: string;
  image?: string;
  replyTo?: MessageType | null;
  createdAt: Date;
  updatedAt: Date;
}
