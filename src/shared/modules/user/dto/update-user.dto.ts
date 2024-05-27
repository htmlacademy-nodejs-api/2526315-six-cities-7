import { UserTypeEnum } from '../../../types/enums.js';

export class UpdateUserDto {
  public name?: string;
  public avatarPath?: string;
  public userType?: UserTypeEnum;
}
