import {UserTypeEnum} from './enums.js';


export type UserType = {
  id: string;
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  userType: UserTypeEnum
}
