import { UserTypeEnum } from './enums.js';

export interface UserInterface {
  // TODo: commented out due to warning in user.model.ts
  // id: string;
  name: string;
  email: string;
  avatarPath: string;
  // password: string;
  userType: UserTypeEnum;
}
