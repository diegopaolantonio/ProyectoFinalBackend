import mongoose from "mongoose";
import chai from "chai";
import { cartDao, productDao } from "../../src/daos/index.js";

const expect = chai.expect;

describe("Set de pruebas unitarias de las funciones de carritos", function () {
  let cart;

  before(function () {
    mongoose.connect(
      "mongodb+srv://dpaolantonioexpertoing:Diego_1985@ecommercetests.xoywinq.mongodb.net/ecommercetests?retryWrites=true&w=majority"
    );
  });

  it("Prueba unitaria para crear un nuevo carrito", async function () {
    cart = await cartDao.addCart();
    expect(cart).to.be.a("object");
    expect(cart).to.have.property("_id");
    expect(cart).to.have.property("products");
  });

  it("Prueba unitaria para buscar todos los carritos", async function () {
    const result = await cartDao.getCarts();
    expect(result).to.be.a("array");
  });

  it("Prueba unitaria para buscar un carrito por el Id", async function () {
    const result = await cartDao.getCartById(cart._id);
    expect(result[0]).to.be.a("object");
    expect(result[0]._id).to.be.eql(cart._id);
  });

  it("Prueba unitaria para agregar productos a un carrito", async function () {
    const mockProduct = {
      title: "Test",
      description: "Product for unit test",
      price: "10",
      code: "Mock Test",
      stock: "1",
      category: "Test",
      status: "false",
    };
    const product = await productDao.addProduct(mockProduct);
    const products = { product: product._id, quantity: 5 };
    const result1 = await cartDao.updateProductsInCart(cart._id, products);
    const result2 = await cartDao.getCartById(cart._id);
    await productDao.deleteProduct(product._id);
    expect(result1).to.be.ok;
    expect(result2[0].products[0].product).to.be.eql(product._id);
    expect(result2[0].products[0].quantity).to.be.eql(5);
  });

  it("Prueba unitaria para eliminar un carrito", async function () {
    const result1 = await cartDao.deleteCart(cart._id);
    const result2 = await cartDao.getCartById(cart._id);
    expect(result1).to.be.ok;
    expect(result2).to.be.a("array");
    expect(result2.length).to.be.eql(0);
  });
});
