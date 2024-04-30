import { UserInterface } from './index.js';

export interface CommentInterface {
  id: string;
  text: string;
  postDate: Date;
  rating: number;
  user: UserInterface;
}
