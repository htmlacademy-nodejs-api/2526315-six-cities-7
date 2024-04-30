import { CoordinatesType } from './index.js';
import { CityNameEnum } from './enums.js';

export type CityType = {
  name: CityNameEnum;
  coordinates: CoordinatesType;
};

export const CITIES: Record<CityNameEnum, CoordinatesType> = {
  [CityNameEnum.Paris]: { latitude: 48.85661, longitude: 2.351499 },
  [CityNameEnum.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [CityNameEnum.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [CityNameEnum.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [CityNameEnum.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [CityNameEnum.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 },
};
