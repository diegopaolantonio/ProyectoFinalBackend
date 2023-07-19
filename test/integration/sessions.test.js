import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integracion para el modulo de sesiones", function() {

    const mockUser = {
        first_name: "Mock",
        last_name: "User",
        age: 30,
        email: "mock@correo.com",
        password: "123",
    };

    it("POST /api/v1/sessions/register: Debe registrar un usuario", async function() {
        const result = await requester.post("/api/v1/sessions/register").send(mockUser);

        expect(result._body).to.be.ok;
        expect(result._body.payload).to.have.property("_id")
        expect(result._body.payload).to.have.property("cart").and.to.be.not.a("null")
    })

    it("POST /api/v1/sessions/login: Debe generar un login", async function() {
        const mockLogin = {
            email: mockUser.email,
            password: mockUser.password,
        };

        const result = await requester.post("/api/v1/sessions/login").send(mockLogin);
        console.log(result._body);
        expect(result._body.payload).to.be.ok;
        expect(result._body.payload.email).to.be.eql(mockLogin.email);
    })

})