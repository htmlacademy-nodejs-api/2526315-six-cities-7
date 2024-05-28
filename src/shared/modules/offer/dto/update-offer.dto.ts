import {
  AmenitiesEnum,
  CityNameEnum,
  PropertyTypeEnum,
} from '../../../types/enums.js';
import { CoordinatesType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: CityNameEnum;
  public previewImage?: string;
  public images?: string[];
  public isPremium: boolean;
  public propertyType?: PropertyTypeEnum;
  public numberOfRooms?: number;
  public numberOfGuests?: number;
  public price?: number;
  public amenities?: AmenitiesEnum[];
  public offerCoordinates?: CoordinatesType;
}
