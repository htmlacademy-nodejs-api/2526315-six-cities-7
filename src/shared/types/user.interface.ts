import { UserTypeEnum } from './enums.js';

export interface UserInterface {
  name: string;
  email: string;
  avatarPath: string;
  userType: UserTypeEnum;
}
