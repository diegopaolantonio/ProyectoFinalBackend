import { faker } from "@faker-js/faker/locale/es";

export const generateProducts = (index) => {
  const status = faker.number.binary() === "1" ? true : false;
  const code = Date.now() + index;
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(50),
    price: faker.number.int({ min: 100, max: 2000 }),
    code,
    stock: faker.number.int({ min: 1, max: 200 }),
    category: faker.commerce.product(),
    status,
    __v: 0,
    thumbnail: faker.image.urlPicsumPhotos({ format: "png" }),
  };
};
