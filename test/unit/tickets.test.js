import mongoose from "mongoose";
import chai from "chai";
import { ticketDao } from "../../src/daos/index.js";
import ticketDto from "../../src/daos/dtos/ticket.dto.js";

const expect = chai.expect;

describe("Set de pruebas para las funciones de Ticket", function() {

    let mockOrder;
    let mockTicket;

    before(function () {
        mongoose.connect(
          "mongodb+srv://dpaolantonioexpertoing:Diego_1985@ecommercetests.xoywinq.mongodb.net/ecommercetests?retryWrites=true&w=majority"
        );
      });

      it("Prueba generar los datos del ticket por el DTO", async function() {
        const amount = 100;
        const email = "test@correo.com";
        var datetime = new Date();
        var purchase_datetime = datetime.toLocaleString();
        mockOrder = new ticketDto(amount, email, purchase_datetime);
        expect(mockOrder).to.be.a("object");
        expect(mockOrder).to.have.property("code").and.to.be.a("Number");
        expect(mockOrder).to.have.property("amount").and.to.be.a("Number");
        expect(mockOrder).to.have.property("purchase_datetime").and.to.be.a("String");
        expect(mockOrder).to.have.property("purchaser").and.to.be.a("String");
      })

      it("Prueba para crear un nuevo Ticket", async function() {
        mockTicket = await ticketDao.createTicket(mockOrder);
        expect(mockTicket).to.be.a("object");
        expect(mockTicket).to.have.property("_id");
        expect(mockTicket.purchaser).to.be.eql(mockOrder.purchaser);
      })

      it("Prueba para mostrar la coleccion completa de Tickets", async function() {
        const result = await ticketDao.getTickets();
        expect(result).to.be.a("array");
        expect(result.length).to.be.gt(0);
      })

      it("Prueba para buscar un Ticket por su Id", async function() {
        const result = await ticketDao.getTicketById(mockTicket._id);
        expect(result).to.be.a("object");
        expect(result._id).to.be.eql(mockTicket._id);
      })

      it("Prueba para eliminar un Ticket por su id", async function() {
        const result1 = await ticketDao.deleteTicket(mockTicket._id);
        const resutl2 = await ticketDao.getTicketById(mockTicket._id);
        expect(result1).to.be.ok;
        expect(resutl2).to.be.a("null");
      })
})

