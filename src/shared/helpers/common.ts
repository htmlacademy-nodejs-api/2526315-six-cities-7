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
  const arr: T[] = [];
  for (let i = 0; i < number; i++) {
    const random = generateRandomValue(0, items.length - 1);
    arr.push(items[random]);
    items = items.filter((item) => item !== items[random]);
  }
  return arr;
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}
