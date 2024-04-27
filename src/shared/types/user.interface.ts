import { UserTypeEnum } from './enums.js';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  userType: UserTypeEnum;
}
