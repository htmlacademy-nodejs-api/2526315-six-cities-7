import { CoordinatesType, UserInterface } from './index.js';

import { AmenitiesEnum, CityNameEnum, PropertyTypeEnum } from './enums.js';

export interface OfferInterface {
  title: string;
  description: string;
  postDate: Date;
  city: CityNameEnum;
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
  offerCoordinates: CoordinatesType;
}
