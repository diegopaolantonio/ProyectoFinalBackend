export default class ticketDto {
  constructor(amount, purchaser, purchase_datetime, soldProducts, unsoldProducts) {
    this.code = Date.now() + Math.floor(Math.random() + 1000 + 1);
    this.purchase_datetime = purchase_datetime;
    this.amount = amount;
    this.purchaser = purchaser;
    this.soldProducts = soldProducts;
    this.unsoldProducts = unsoldProducts;
  }
}
