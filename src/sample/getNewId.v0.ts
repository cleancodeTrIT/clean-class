// ToDo: fix the length of the generated ID at constructor time

/**
 * Generates a unique ID string.
 * @example
 * const uniqueId = generateUniqueId();
 * console.log(uniqueId); // Output: e.g., "17a8a241fb"
 * @returns A unique ID string
 */
export class IdGenerator {
  private static counter = 0;
  private static lastTimestamp = 0;
  private static timestampMinLength = 11;
  private maxCounter: number = 255;
  private discriminatorLength: number = 2;
  private timestampLength: number = 12;
  private hasDiscriminator: boolean = true;

  constructor(totalLength = 14) {
    if (totalLength < IdGenerator.timestampMinLength) {
      throw new Error(
        `The total length of the generated ID must be at least ${IdGenerator.timestampMinLength} characters long.`
      );
    }
    this.discriminatorLength = totalLength - IdGenerator.timestampMinLength;
    this.hasDiscriminator = this.discriminatorLength > 0;
    this.timestampLength = totalLength - this.discriminatorLength;
    this.maxCounter = Math.pow(16, this.discriminatorLength) - 1;
    // console.log(`this: `, JSON.stringify(this, null, 2));
  }

  generate(): string {
    let uniqueId = "";
    // Get current timestamp in milliseconds
    const timestamp = new Date().getTime();
    // Convert the timestamp and discriminator to hexadecimal strings
    const timestampHex = timestamp.toString(16);
    // Get the discriminator value
    // Pad the hexadecimal strings with leading zeros to ensure fixed length
    const paddedTimestampHex = timestampHex.padStart(this.timestampLength, "0");

    if (this.hasDiscriminator) {
      const discriminator = this.timestampLength > 0 ? this.getDiscriminator(timestamp) : 0;

      if (discriminator === -1) {
        // If the discriminator is -1, the maximum ID generation rate has been reached
        // Wait for the next millisecond and try again
        return this.generate();
      }

      const discriminatorHex = discriminator.toString(16);
      const paddedDiscriminatorHex = discriminatorHex.padStart(this.discriminatorLength, "0");
      uniqueId = paddedTimestampHex + paddedDiscriminatorHex;
      // Concatenate the padded hexadecimal strings
    } else {
      uniqueId = paddedTimestampHex;
    }
    return uniqueId;
  }

  private getDiscriminator(timestamp: number): number {
    if (timestamp === IdGenerator.lastTimestamp) {
      // Increment the counter if the timestamp hasn't changed since last call
      IdGenerator.counter++;
      if (IdGenerator.counter > this.maxCounter) {
        // Reset the counter if it has reached its maximum value
        console.warn("⚠️ Maximum ID generation rate reached.");
        IdGenerator.counter = -1;
      }
    } else {
      // Reset the counter if the timestamp has changed since last call
      IdGenerator.counter = 0;
    }
    IdGenerator.lastTimestamp = timestamp;
    return IdGenerator.counter;
  }
}
