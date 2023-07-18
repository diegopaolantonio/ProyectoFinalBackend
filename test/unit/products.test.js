    import mongoose from "mongoose";
    import chai from "chai";
    import { productDao } from "../../src/daos/index.js";

    const expect = chai.expect;

    describe("Set de pruebas de las funciones de products", function() {
        const mockProduct = {
            title: "Test",
            description: "Product for unit test",
            price: "10",
            code: "Mock Test",
            stock: "1",
            category: "Test",
            status: "false",
        }
        let product;

        before(function() {
            mongoose.connect("mongodb+srv://dpaolantonioexpertoing:Diego_1985@ecommercetests.xoywinq.mongodb.net/ecommercetests?retryWrites=true&w=majority")
        });

        it("Prueba crear un producto", async function() {
            product = await productDao.addProduct(mockProduct);
            expect(product).to.have.property("_id");
            expect(product.owner).to.be.eql("admin");
        })

        it("Buscar la coleccion de productos", async function() {
            const result = await productDao.getProducts();
            expect(result).to.be.a("object");
        })

        it("Buscar un producto por id", async function() {
            const result = await productDao.getProductById(product._id);
            expect(result).to.be.a("array");
            expect(result[0]._id).to.be.eql(product._id);
            expect(result[0].code).to.be.eql(product.code);
        })

        it("Actualizar un producto", async function() {
            await productDao.updateProduct(product._id, {title: "Nuevo Titulo"});
            const result = await productDao.getProductById(product._id);
            expect(result).to.be.a("array");
            expect(result[0].title).to.be.eql("Nuevo Titulo");
            expect(result[0].code).to.be.eql(product.code);
        })

        it("Prueba para eliminar un producto por su id", async function() {
            const result1 = await productDao.deleteProduct(product._id);
            const result2 = await productDao.getProductById(product._id);
            expect(result1).to.be.ok;
            expect(result2).to.be.a("array");
            expect(result2.length).to.be.eql(0);
        })
    })