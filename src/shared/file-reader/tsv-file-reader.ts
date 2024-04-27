import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { OfferInterface } from '../types/offer.interface.js';
import {
  AmenitiesEnum,
  CityNameEnum,
  PropertyTypeEnum,
  UserTypeEnum,
} from '../types/enums.js';
import { UserInterface } from '../types/user.interface.js';
import { CoordinatesType } from '../types/coordinates.type.js';
import { CITIES, CityType } from '../types/city.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Array<OfferInterface> {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): OfferInterface {
    const [
      postId,
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
      userId,
      email,
      avatarPath,
      userType,
      password,
      numberOfComments,
      coordinates,
    ] = line.split('\t');

    return {
      id: postId,
      title,
      description,
      postDate: new Date(createdDate),
      city: this.parseCity(city as CityNameEnum),
      previewImage,
      images: this.parseListString(images),
      isPremium: !!isPremium,
      isFavorite: !!isFavorite,
      rating: parseFloat(rating),
      propertyType: propertyType as PropertyTypeEnum,
      numberOfRooms: parseInt(numberOfRooms, 10),
      numberOfGuests: parseInt(numberOfGuests, 10),
      price: parseInt(price, 10),
      amenities: this.parseListString(amenities) as AmenitiesEnum[],
      author: this.parseUser(
        name,
        userId,
        email,
        avatarPath,
        password,
        userType as UserTypeEnum,
      ),
      numberOfComments: parseInt(numberOfComments, 10),
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  private parseCoordinates(coordinatesString: string): CoordinatesType {
    const [latitude, longitude] = coordinatesString.split(';');
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
  }

  private parseCity(city: CityNameEnum): CityType {
    if (Object.keys(CITIES).includes(city)) {
      return { name: city, coordinates: CITIES[city] };
    }
    return { name: city, coordinates: { latitude: 0, longitude: 0 } };
  }

  private parseListString(categoriesString: string): string[] {
    return categoriesString.split(';').map((item) => item);
  }

  private parseUser(
    name: string,
    userId: string,
    email: string,
    avatarPath: string,
    password: string,
    userType: UserTypeEnum,
  ): UserInterface {
    return { name, id: userId, email, avatarPath, password, userType };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Array<OfferInterface> {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
