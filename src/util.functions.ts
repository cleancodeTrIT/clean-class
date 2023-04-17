/**
 * Generates a new id based on the current timestamp and a random number
 * @returns a new id
 */
export function getNewId(): string {
  const SIZE = 14;
  const timestamp = getHexTimestamp();
  const randomSize = SIZE - timestamp.length;
  const random = getHexRandom(randomSize);
  return getFullId(timestamp, random, SIZE);
}

function getHexTimestamp(): string {
  return new Date().getTime().toString(16);
}

function getHexRandom(size: number): string {
  const randomHex = getRandom(size);
  return ensureSize(randomHex, size);
}

function getRandom(randomSize: number): string {
  const factor = 10 ** randomSize;
  const random = Math.floor(Math.random() * factor);
  return random.toString(16);
}

function getFullId(timestamp: string, random: string, size: number): string {
  const fullId = `${timestamp}${random}`;
  return ensureSize(fullId, size);
}

function ensureSize(source: string, size: number): string {
  return source.padStart(size - 1, "0");
}

/**
 * Generates a slug (text-be-used-as-an-url) from a given string
 * @param source
 * @returns the-slug
 */
export function getSlug(source: string): string {
  return source
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "_");
}
