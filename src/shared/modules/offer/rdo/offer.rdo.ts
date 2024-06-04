import { Expose } from 'class-transformer';
import { CoordinatesType } from '../../../types/index.js';
import {
  AmenitiesEnum,
  CityNameEnum,
  PropertyTypeEnum,
} from '../../../types/enums.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: CityNameEnum;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public rating: number;

  @Expose()
  public isPremium: boolean;

  // надо?
  // @Expose()
  // public isFavorite: boolean;

  @Expose()
  public propertyType: PropertyTypeEnum;

  @Expose()
  public numberOfRooms: number;

  @Expose()
  public numberOfGuests: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: AmenitiesEnum[];

  @Expose()
  public userId: string;

  @Expose()
  public numberOfComments: number;

  @Expose()
  public offerCoordinates: CoordinatesType;
}
