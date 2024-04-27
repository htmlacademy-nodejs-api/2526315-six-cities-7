import { UserInterface } from './user.interface.js';
import { CoordinatesType } from './coordinates.type.js';
import { CityType } from './city.type.js';
import { AmenitiesEnum, PropertyTypeEnum } from './enums.js';

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
