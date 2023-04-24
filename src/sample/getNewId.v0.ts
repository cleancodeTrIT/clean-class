/**
 * Generates a unique ID string of a desired length.
 * @param totalLength The total length of the ID string. Defaults to 14.
 * @example
 * const uniqueId = new IdGenerator().generate();
 * console.log(uniqueId); // Output: e.g., "17a8a241fb"
 * @returns A unique ID string
 */
export class IdGenerator {
  private static discriminator = -1;
  private static currentTimestamp = 0;
  private static readonly TIMESTAMP_MIN_LENGTH = 11;
  private static readonly BASE = 16;
  private timestampLength: number = 12;
  private hasDiscriminator: boolean = true;
  private maxDiscriminator: number = 255;
  private discriminatorLength: number = 2;

  constructor(totalLength = 14) {
    if (totalLength < IdGenerator.TIMESTAMP_MIN_LENGTH) {
      throw new Error(`ID must be >= ${IdGenerator.TIMESTAMP_MIN_LENGTH} long.`);
    }
    this.configureDiscriminator(totalLength);
  }

  generate(): string {
    let uniqueId = "";
    while (uniqueId === "") {
      uniqueId = this.tryGetUniqueId();
    }
    return uniqueId;
  }

  private tryGetUniqueId() {
    let uniqueId: string = "";
    try {
      const paddedBaseTimestampBase = this.getPaddedBaseTimestamp();
      const paddedBaseDiscriminator = this.getPaddedBaseDiscriminator();
      uniqueId = paddedBaseTimestampBase + paddedBaseDiscriminator;
    } catch (error: any) {
      this.detectCollision(error);
      uniqueId = "";
    }
    return uniqueId;
  }

  private detectCollision(error: any) {
    if (error.message !== "Collision rate reached.") {
      throw error;
    }
  }

  private configureDiscriminator(totalLength: number) {
    this.discriminatorLength = totalLength - IdGenerator.TIMESTAMP_MIN_LENGTH;
    this.hasDiscriminator = this.discriminatorLength > 0;
    this.timestampLength = totalLength - this.discriminatorLength;
    this.maxDiscriminator = this.calculateMaxDiscriminator();
  }

  private calculateMaxDiscriminator(): number {
    const totalDifferentValues = Math.pow(IdGenerator.BASE, this.discriminatorLength);
    const maxDiscriminator = totalDifferentValues - 1;
    return maxDiscriminator;
  }

  private getPaddedBaseTimestamp() {
    const timestamp = this.getTimestamp();
    const paddedTimestampHex = this.transformToPaddedBase(timestamp, this.timestampLength);
    return paddedTimestampHex;
  }

  private getPaddedBaseDiscriminator(): string {
    if (!this.hasDiscriminator) return "";
    const discriminator = this.getDiscriminator();
    const paddedDiscriminatorHex = this.transformToPaddedBase(discriminator, this.discriminatorLength);
    return paddedDiscriminatorHex;
  }

  private transformToPaddedBase(source: number, length: number): string {
    const base = source.toString(IdGenerator.BASE);
    const paddedBase = base.padStart(length, "0");
    return paddedBase;
  }

  private getTimestamp(): number {
    const timestamp = new Date().getTime();
    if (this.isNewTimestamp(timestamp)) {
      this.resetDiscriminator(timestamp);
    }
    return timestamp;
  }

  private resetDiscriminator(timestamp: number) {
    IdGenerator.currentTimestamp = timestamp;
    IdGenerator.discriminator = -1;
  }

  private isNewTimestamp(timestamp: number) {
    return IdGenerator.currentTimestamp !== timestamp;
  }

  private getDiscriminator(): number {
    const discriminator = IdGenerator.discriminator++;
    if (discriminator > this.maxDiscriminator) {
      throw new Error("Collision rate reached.");
    }
    return IdGenerator.discriminator;
  }
}
