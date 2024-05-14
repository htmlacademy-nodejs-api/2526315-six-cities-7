import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { OfferInterface } from '../../types/index.js';
import {
  AmenitiesEnum,
  CityNameEnum,
  PropertyTypeEnum,
  UserTypeEnum,
} from '../../types/enums.js';
import { UserInterface } from '../../types/index.js';
import { CoordinatesType } from '../../types/index.js';
import { CITIES, CityType } from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): OfferInterface {
    const [
      // postId,
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
      // id: postId,
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
    email: string,
    avatarPath: string,
    userType: UserTypeEnum,
  ): UserInterface {
    return { name, email, avatarPath, userType };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
