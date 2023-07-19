import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integracion para el modulo de productos", function () {
  
  const mockUser = {
    first_name: "Mock",
    last_name: "User",
    age: 30,
    email: "mock@correo.com",
    password: "123",
    role: "premium",
  };

  const mockLogin = {
    email: mockUser.email,
    password: mockUser.password,
  };

  const mockProduct = {
    title: "Test",
    description: "Product for unit test",
    price: "10",
    code: "Mock Test",
    stock: "1",
    category: "Test",
    status: "false",
  };

  it("POST /api/v1/products/", async function () {
    // let req;
    // req.session.user = {
    //   first_name: "Mock",
    //   last_name: "User",
    //   age: 30,
    //   email: "mock@correo.com",
    //   //            cart: '64b72eb1db87c1cf7c80f69f',
    //   role: "premium",
    // };

    

    await requester.post("/api/v1/sessions/login").send(mockLogin);

    const result = await requester
      .post("/api/v1/products/")
      .field("title", mockProduct.title)
      .field("description", mockProduct.description)
      .field("price", mockProduct.price)
      .field("code", mockProduct.code)
      .field("stock", mockProduct.stock)
      .field("category", mockProduct.category)
      .field("status", mockProduct.status);

    console.log(result);

    expect(result).to.be.ok;
  });
});
