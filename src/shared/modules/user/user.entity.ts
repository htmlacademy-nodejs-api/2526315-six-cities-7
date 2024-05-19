import { UserInterface } from '../../types/index.js';
import { UserTypeEnum } from '../../types/enums.js';
import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false })
  public avatarPath: string;

  @prop({ required: true, type: () => String, enum: UserTypeEnum })
  public userType: UserTypeEnum;

  @prop({ required: true })
  private password?: string;

  constructor(userData: UserInterface) {
    super();
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
