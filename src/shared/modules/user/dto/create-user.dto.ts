import { UserTypeEnum } from '../../../types/enums.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarPath: string;
  public userType: UserTypeEnum;
  public password: string;
}
