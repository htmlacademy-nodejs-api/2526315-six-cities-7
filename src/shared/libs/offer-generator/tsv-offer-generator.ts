import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';

import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
  getNumberOfDifferentItems,
  generateRandomCoordinatesForTheOffer,
} from '../../helpers/index.js';
import { CITIES, MockServerData } from '../../types/index.js';
import {
  CityNameEnum,
  PropertyTypeEnum,
  UserTypeEnum,
} from '../../types/enums.js';

const MIN_PRICE = 100;
const MAX_PRICE = 500;

const MAX_NUMBER_OF_GUESTS = 6;

const MAX_NUMBER_OF_ROOMS = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<CityNameEnum>(
      this.mockData.cities as CityNameEnum[],
    );
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getNumberOfDifferentItems<string>(
      this.mockData.images,
      6,
    ).join(';');
    const isPremium = getRandomItem<boolean>([true, false]);
    const isFavorite = getRandomItem<boolean>([true, false]);
    const rating = getRandomItem<string>(this.mockData.ratings);
    const propertyType = getRandomItem<PropertyTypeEnum>(
      this.mockData.propertyTypes as PropertyTypeEnum[],
    );
    const numberOfRooms = generateRandomValue(1, MAX_NUMBER_OF_ROOMS);
    const numberOfGuests = generateRandomValue(1, MAX_NUMBER_OF_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');
    const name = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem([UserTypeEnum.Pro, UserTypeEnum.Basic]);
    const commentsAmount = generateRandomValue(5, 50);
    const offerCoordinates = generateRandomCoordinatesForTheOffer(
      CITIES[city as CityNameEnum],
    );

    return [
      title,
      description,
      postDate,
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
      commentsAmount,
      offerCoordinates,
    ].join('\t');
  }
}
