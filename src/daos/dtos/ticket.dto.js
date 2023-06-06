export default class ticketDto {
  constructor(amount, purchaser) {
    this.code = Date.now() + Math.floor(Math.random() + 1000 + 1);
    this.purchase_datetime = Date.now();
    this.amount = amount;
    this.purchaser = purchaser;
  }
}
