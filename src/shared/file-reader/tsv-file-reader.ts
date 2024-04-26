import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { OfferType } from '../types/offer.type.js';
import {
  AmenitiesEnum,
  CityNameEnum,
  PropertyTypeEnum,
  UserTypeEnum,
} from '../types/enums.js';
import { UserType } from '../types/user.type.js';
import { CoordinatesType } from '../types/coordinates.type.js';
import { Cities, CityType } from '../types/city.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): OfferType[] {
    console.log('?????', this.rawData);

    const splitted = this.rawData.split('\n');

    console.log('splitted', splitted);

    return splitted
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): OfferType {
    const [
      title,
      description,
      createdDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      propertyType,
      numberOfRooms,
      numberOfGuests,
      price,
      amenities,
      name,
      email,
      avatarPath,
      userType,
      numberOfComments,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: this.parseCity(city as CityNameEnum),
      previewImage,
      images: this.parseCategories(images),
      isPremium: !!isPremium,
      isFavorite: !!isFavorite,
      rating: parseFloat(rating),
      propertyType:
        PropertyTypeEnum[
          propertyType as 'apartment' | 'house' | 'room' | 'hotel'
        ],
      numberOfRooms: parseInt(numberOfRooms, 10),
      numberOfGuests: parseInt(numberOfGuests, 10),
      price: parseInt(price, 10),
      amenities: this.parseAmenities(amenities) as AmenitiesEnum[],
      author: this.parseUser(name, email, avatarPath, userType as UserTypeEnum),
      numberOfComments: parseInt(numberOfComments, 10),
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  private parseCoordinates(coordinatesString: string): CoordinatesType {
    const [latitude, longitude] = coordinatesString.split(';');
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
  }

  private parseCity(city: CityNameEnum): CityType {
    const foundCity = Cities.find((item) => item.name === city);
    if (foundCity) {
      return foundCity;
    }
    return { name: city, coordinates: { latitude: 0, longitude: 0 } };
  }

  private parseCategories(categoriesString: string): string[] {
    return categoriesString.split(';').map((item) => item);
  }

  private parseAmenities(amenitiesString: string): string[] {
    return amenitiesString.split(';').map((item) => item);
  }

  private parseUser(
    name: string,
    email: string,
    avatarPath: string,
    userType: UserTypeEnum,
  ): UserType {
    return { name, email, avatarPath, userType };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): OfferType[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
