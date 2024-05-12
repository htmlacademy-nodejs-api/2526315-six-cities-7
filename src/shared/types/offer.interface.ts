import { UserInterface } from './index.js';
import { CoordinatesType } from './index.js';
import { AmenitiesEnum, PropertyTypeEnum } from './enums.js';
import { CityType } from './index.js';

export interface OfferInterface {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  city: CityType;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  propertyType: PropertyTypeEnum;
  numberOfRooms: number;
  numberOfGuests: number;
  price: number;
  amenities: AmenitiesEnum[];
  author: UserInterface;
  numberOfComments: number;
  coordinates: CoordinatesType;
}
