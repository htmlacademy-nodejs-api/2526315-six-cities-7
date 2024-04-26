import {CoordinatesType} from './coordinates.type.js';
import {CityNameEnum} from './enums.js';

export type CityType = {
  name: CityNameEnum;
  coordinates: CoordinatesType;
};


export const Cities: CityType[] = [
  {name:CityNameEnum.Paris, coordinates:{ latitude: 48.85661, longitude: 2.351499 }},
  {name:CityNameEnum.Cologne, coordinates:{ latitude: 50.938361, longitude: 6.959974 }},
  {name:CityNameEnum.Brussels, coordinates:{latitude: 50.846557, longitude: 4.351697}},
  {name:CityNameEnum.Amsterdam, coordinates:{ latitude: 52.370216, longitude: 4.895168 }},
  {name:CityNameEnum.Hamburg, coordinates:{ latitude: 53.550341, longitude: 10.000654 }},
  {name:CityNameEnum.Dusseldorf, coordinates:{ latitude: 51.225402, longitude: 6.776314 }},
];


