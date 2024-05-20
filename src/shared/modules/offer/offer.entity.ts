import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

import {
  AmenitiesEnum,
  CityNameEnum,
  PropertyTypeEnum,
} from '../../types/enums.js';
import { UserEntity } from '../user/index.js';
import { CoordinatesType } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title: string;

  @prop({ required: true, trim: true })
  public description: string;

  @prop()
  public postDate: Date;

  @prop({
    required: true,
    type: () => String,
    enum: CityNameEnum,
  })
  public city: CityNameEnum;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({
    required: true,
    type: () => String,
    enum: PropertyTypeEnum,
  })
  public propertyType: PropertyTypeEnum;

  @prop({ required: true })
  public numberOfRooms: number;

  @prop({ required: true })
  public numberOfGuests: number;

  @prop({ required: true })
  public price: number;

  @prop({
    type: () => Array<string>,
  })
  public amenities: AmenitiesEnum[];

  @prop({ required: true })
  public numberOfComments: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({
    required: true,
  })
  public offerCoordinates: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
