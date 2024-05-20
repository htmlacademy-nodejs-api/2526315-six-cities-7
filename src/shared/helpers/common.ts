import { CoordinatesType } from '../types/index.js';

export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0,
) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}
export function getNumberOfDifferentItems<T>(items: T[], number: number): T[] {
  const result: Set<T> = new Set();
  while (result.size !== number) {
    const random = generateRandomValue(0, items.length - 1);
    result.add(items[random]);
  }
  return Array.from(result);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
export function generateRandomCoordinatesForTheOffer(
  coords: CoordinatesType,
): string {
  const random = generateRandomValue(-0.00009, 0.00009, 6);
  const randomLat = (coords.latitude + random).toFixed(6);
  const randomLon = (coords.longitude + random).toFixed(6);

  return `${randomLat};${randomLon}`;
}
