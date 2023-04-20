// ✅ Enforce invariant rules that ensure data quality

class ClientVO {
  // 😏 immutable data
  constructor(public readonly name: string, public readonly country: string, public readonly city: string) {
    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters");
    }
  }
}

class PaymentVO {
  // 😏 mutable, but with validation
  private _amount: number = 0;
  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    if (value < 0) {
      throw new Error("Amount must be greater than 0");
    }
    this._amount = value;
  }
  constructor(
    amount: number,
    public readonly isDeferredPayment: boolean,
    public readonly monthsDeferred: number,
    public readonly isRecurredPayment: boolean
  ) {
    this.amount = amount;
    if (isDeferredPayment && isRecurredPayment) {
      throw new Error("Payment can't be deferred and recurred");
    }
    if (isDeferredPayment && monthsDeferred < 1) {
      throw new Error("Months deferred must be greater than 0");
    }
  }
}

// ✅ add functionality to data (contruction, representation...)

class CardVO {
  public readonly number: string;
  public readonly validUntil: string;
  public readonly verificationCode: number;

  constructor(number: string, validUntil: string, verificationCode: number) {
    // 😏 complex validations on their own methods
    this.number = this.getNumber(number);
    this.validUntil = this.getValidUntil(validUntil);
    this.verificationCode = this.getVerificationCode(verificationCode);
  }

  private getNumber(number: string) {
    number = number.replace(/\s/g, "");
    if (number.length !== 16 && number.match(/[^0-9]/)) {
      throw new Error("Card number must be 16 digits");
    }
    return number;
  }
  private getValidUntil(validUntil: string): string {
    validUntil = validUntil.replace(/\s/g, "");
    if (validUntil.length !== 5 && validUntil.match(/[^0-9/]/)) {
      throw new Error("Valid until must be 5 digits only and a slash");
    }
    if (parseInt(validUntil.substring(0, 2)) > 12) {
      throw new Error("Month must be between 1 and 12");
    }
    return validUntil;
  }
  private getVerificationCode(verificationCode: number): number {
    if (verificationCode < 100 || verificationCode > 999) {
      throw new Error("Verification code must be between 100 and 999");
    }
    return verificationCode;
  }
  // 😏 change representation without changing the value
  getExpirationDate() {
    const monthOrdinal = parseInt(this.validUntil.substring(0, 2)) - 1;
    const year = parseInt(this.validUntil.substring(3, 5));
    return new Date(year, monthOrdinal, 1);
  }
  getMaskedNumber() {
    const last = this.number.substring(12);
    const maskedNumber = `**** **** **** ${last}`;
    return maskedNumber;
  }
}
