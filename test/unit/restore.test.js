import mongoose from "mongoose";
import chai from "chai";
import { restoreDao } from "../../src/daos/index.js";

const expect = chai.expect;

describe("Set de pruebas unitarias para las funciones de restore", function () {
  let restore;

  before(function () {
    mongoose.connect(
      "mongodb+srv://dpaolantonioexpertoing:Diego_1985@ecommercetests.xoywinq.mongodb.net/ecommercetests?retryWrites=true&w=majority"
    );
  });

  it("Prueba unitaria para crear un nuevo restore", async function () {
    restore = await restoreDao.createRestore({
      email: "test@correo.com",
      createDate: "2023-07-05T23:57:02.187+00:00",
      expirateDate: "2023-07-06T00:57:02.187+00:00",
    });
    expect(restore).to.have.property("_id");
    expect(restore).to.be.a("object");
  });

  it("Prueba unitaria para traer coleccion completa de restore", async function () {
    const result = await restoreDao.getRestores();
    expect(result).to.be.a("array");
  });

  it("Prueba unitaria para buscar un restore por el id", async function () {
    const result = await restoreDao.getRestoreById(restore._id);
    expect(result).to.be.a("object");
    expect(result._id).to.be.eql(restore._id);
    expect(result.email).to.be.eql(restore.email);
  });

  it("Prueba unitaria para buscar un restore por el email", async function () {
    const result = await restoreDao.getRestoreByEmail(restore.email);
    expect(result).to.be.a("array");
    expect(result[0].email).to.be.eql(restore.email);
  });

  it("Prueba unitaria para eliminar restores por su email", async function () {
    const result1 = await restoreDao.deleteRestoreByEmail(restore.email);
    const result2 = await restoreDao.getRestoreByEmail(restore.email);
    expect(result1).to.be.ok;
    expect(result2).to.be.a("array");
    expect(result2[0]).to.be.eql(undefined);
  });
});
