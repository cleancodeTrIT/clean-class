/**
 * Generates a unique ID string of a desired length.
 * @param totalLength The total length of the ID string. Defaults to 14.
 * @example
 * const uniqueId = new IdGenerator().generate();
 * console.log(uniqueId); // Output: e.g., "17a8a241fb"
 * @returns A unique ID string
 */
export class IdGenerator {
  private static counter = -1;
  private static currentTimestamp = 0;
  private static readonly tml = 11; // Timestamp minimum length
  private timestampLength: number = 12;
  private discriminator: boolean = true;
  private maxDiscriminator: number = 255;
  private discriminatorLength: number = 2;

  constructor(totalLength = 14) {
    if (totalLength >= IdGenerator.tml) {
      // Configure the ID generator
      this.discriminatorLength = totalLength - IdGenerator.tml;
      this.discriminator = this.discriminatorLength > 0;
      this.timestampLength = totalLength - this.discriminatorLength;
      // Calculate the total different IDs that can be generated,
      // minus one to account for the counter
      this.maxDiscriminator = Math.pow(16, this.discriminatorLength) - 1;
    } else {
      throw new Error(`ID must be >= ${IdGenerator.tml} long.`);
    }
  }

  generate(): string {
    let uniqueId = "";
    while (uniqueId === "") {
      // Try get a unique ID
      try {
        // Get the timestamp as an hex of fixed length
        const timestamp = new Date().getTime();
        // Check if the timestamp has changed
        if (IdGenerator.currentTimestamp !== timestamp) {
          // Reset the counter
          IdGenerator.currentTimestamp = timestamp;
          IdGenerator.counter = -1;
        }
        const baseTimestamp = timestamp.toString(16);
        const paddedBaseTimestampBase = baseTimestamp.padStart(this.timestampLength, "0");
        // Get the discriminator as an hex of fixed length
        let paddedDiscriminatorHex = "";
        if (this.discriminator) {
          const discriminator = IdGenerator.counter++;
          if (discriminator > this.maxDiscriminator || discriminator < 0) {
            throw new Error("Collision rate reached.");
          }
          const baseDiscriminator = discriminator.toString(16);
          paddedDiscriminatorHex = baseDiscriminator.padStart(this.discriminatorLength, "0");
        }
        uniqueId = paddedBaseTimestampBase + paddedDiscriminatorHex;
      } catch (error: any) {
        // Detect if the error is a collision error
        if (error.message !== "Collision rate reached.") {
          throw error;
        }
        uniqueId = "";
      }
    }
    return uniqueId;
  }
}
