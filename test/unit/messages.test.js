import mongoose from "mongoose";
import chai from "chai";
import { messageDao } from "../../src/daos/index.js";

const expect = chai.expect;

describe("Ser de pruebas para las funciones de mensajes", function() {
    let message;

    before(function () {
        mongoose.connect(
          "mongodb+srv://dpaolantonioexpertoing:Diego_1985@ecommercetests.xoywinq.mongodb.net/ecommercetests?retryWrites=true&w=majority"
        );
      });

    it("Prueba para crear nuevo mensaje", async function() {
        message = await messageDao.createMessage({user: "Test user", message: "Mensaje de prueba"});
        expect(message).to.have.property("_id");
        expect(message).to.be.a("object");
    })

    it("Prueba para mostrar los mensajes de la coleccion", async function() {
        const result = await messageDao.getMessages();
        expect(result).to.be.a("array");
        expect(result.length).to.be.gt(0);
    })

    it("Prueba para eliminar un mensaje por su Id", async function() {
        const result0 = await messageDao.getMessages();
        const result1 = await messageDao.deleteMessage(message._id);
        const result2 = await messageDao.getMessages();
        expect(result1).to.be.ok;
        expect(result0.length-result2.length).to.be.eql(1);
    })
})