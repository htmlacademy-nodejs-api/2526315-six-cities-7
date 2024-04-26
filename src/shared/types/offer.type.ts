import { UserType } from './user.type.js';
import {CoordinatesType} from './coordinates.type.js';
import {CityType} from './city.type.js';
import {AmenitiesEnum, PropertyTypeEnum} from './enums.js';

export type OfferType = {
  id:string;
  title: string;
  description: string;
  postDate: Date;
  city: CityType;
  previewImage: string;
  images:string[];
  isPremium: boolean;
  isFavorite:boolean;
  rating: number;
  offerType: PropertyTypeEnum;
  numberOfRooms: number;
  numberOfGuests:number;
  price: number;
  amenities: AmenitiesEnum[];
  author: UserType;
  numberOfComments: number;
  coordinates:CoordinatesType;
}
