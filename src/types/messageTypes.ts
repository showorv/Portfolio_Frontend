export interface IMessage {
  _id?: string;
  name?: string;
  email: string;
  subject?: string;
  description: string;
  isRead?: boolean;
  createdAt?: string;
}
