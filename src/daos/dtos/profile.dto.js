export default class profileDto {
  constructor(profile) {
    this.name = `${profile.first_name} ${profile.last_name}`;
    this.age = profile.age;
    this.email = profile.email;
    this.role = profile.role;
    this.cart = profile.cart;
  }
}
