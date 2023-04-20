// ✅ Entities can be aggregated in complex hierarchies

import { Card, Payment } from "./3-entity";

// 😏 a client with his cards
export class ClientAggregate {
  public readonly cards: Card[] = [];

  constructor(public readonly client: Client, private preferredCard: Card) {}

  addCard(card: Card, isPreferred: boolean) {
    // 😏 ensures that the client always has a card marked as preferred
    this.cards.push(card);
    if (isPreferred) {
      this.preferredCard = card;
    }
  }
  getPreferredCard() {
    return this.preferredCard;
  }
}

// 😏 a client(with his cars) with his payments
export class ClientPaymentsAggregate {
  // 😏 stores related data
  private payments: PaymentVO[] = [];

  // 😏 we can aggregate an entity or another aggregate
  constructor(public readonly client: ClientAggregate) {}

  performPayment(payment: Payment) {
    const card = this.client.getPreferredCard();
    payment.payWithCard(card);
    this.payments.push(payment.data);
  }
  getPayments() {
    return [...this.payments];
  }
}
