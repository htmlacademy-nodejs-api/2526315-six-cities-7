import { UserType } from './user.type.js';

export type CommentType = {
  id: string;
  text: string;
  postDate: Date;
  rating: number;
  user: UserType;
};
