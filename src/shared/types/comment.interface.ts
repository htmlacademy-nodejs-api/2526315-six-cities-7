import { UserInterface } from './user.interface.js';

export interface CommentInterface {
  id: string;
  text: string;
  postDate: Date;
  rating: number;
  user: UserInterface;
}
