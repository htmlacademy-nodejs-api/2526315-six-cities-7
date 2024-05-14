import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

import { CityType, CoordinatesType } from '../../types/index.js';
import { AmenitiesEnum, PropertyTypeEnum } from '../../types/enums.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'categories',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public postDate!: Date;

  //
  @prop({ required: true })
  public city: CityType;
  //

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({
    type: () => String,
    enum: PropertyTypeEnum,
  })
  public propertyType: PropertyTypeEnum;

  @prop({ required: true })
  public numberOfRooms: number;

  @prop({ required: true })
  public numberOfGuests: number;

  @prop()
  public price!: number;

  @prop({
    type: () => Array<string>,
    enum: AmenitiesEnum,
  })
  public amenities: AmenitiesEnum[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ required: true })
  public numberOfComments: number;

  @prop({})
  public coordinates: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
