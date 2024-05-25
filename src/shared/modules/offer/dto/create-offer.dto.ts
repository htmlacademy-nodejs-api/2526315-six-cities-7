import {
  AmenitiesEnum,
  CityNameEnum,
  PropertyTypeEnum,
} from '../../../types/enums.js';
import { CoordinatesType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: CityNameEnum;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  // public rating: number;
  public propertyType: PropertyTypeEnum;
  public numberOfRooms: number;
  public numberOfGuests: number;
  public price: number;
  public amenities: AmenitiesEnum[];
  public numberOfComments: number;
  public userId: string;
  public offerCoordinates: CoordinatesType;
}
