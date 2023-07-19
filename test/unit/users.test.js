import mongoose from "mongoose";
import chai from "chai";
import { userDao } from "../../src/daos/index.js";
import profileDto from "../../src/daos/dtos/profile.dto.js";

const expect = chai.expect;

describe("Set de pruebas unitarias de las funciones de users", function () {
  let mockUser = {
    first_name: "Test",
    last_name: "User",
    email: "test@correo.com",
    age: 38,
    password: "123",
  };
  let user;

  before(function () {
    mongoose.connect(
      "mongodb+srv://dpaolantonioexpertoing:Diego_1985@ecommercetests.xoywinq.mongodb.net/ecommercetests?retryWrites=true&w=majority"
    );
  });

  it("Prueba unitaria para crear usuario, agregando el role de user", async function () {
    user = await userDao.createUser(mockUser);
    expect(user).to.have.property("_id");
    expect(user.role).to.be.eql("user");
  });

  it("Prueba unitaria para traer todos los usuarios de la base de datos", async function () {
    const result = await userDao.getUsers();
    expect(result).to.be.a("array");
  });

  it("Prueba unitaria para buscar un usuario por su email", async function () {
    const result = await userDao.getUserByEmail(mockUser.email);
    expect(result).to.be.a("object");
    expect(result._id).to.be.eql(user._id);
    expect(result.email).to.be.eql(user.email);
  });

  it("Prueba unitaria para buscar un usuario por su id", async function () {
    const result = await userDao.getUserById(user._id);
    expect(result).to.be.a("object");
    expect(result._id).to.be.eql(user._id);
    expect(result.email).to.be.eql(user.email);
  });

  it("Prueba unitaria para actualizar un usuario", async function () {
    await userDao.updateUser(user._id, { last_name: "Updated User" });
    const result = await userDao.getUserById(user._id);
    expect(result).to.be.a("object");
    expect(result.last_name).to.be.eql("Updated User");
    expect(result._id).to.be.eql(user._id);
    expect(result.email).to.be.eql(user.email);
  });

  it("Prueba unitaria para eliminar un usuario por su email", async function () {
    const result1 = await userDao.deleteUser(user._id);
    const result2 = await userDao.getUserByEmail(mockUser.email);
    expect(result1).to.be.ok;
    expect(result2).to.be.a("null");
  });
});
