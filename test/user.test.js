import supertest from "supertest"
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js"
import { createTestUser, removeDataUserTest } from "./test-util.js"

describe("POST /api/users", function () {
    afterEach(async () => {
       await removeDataUserTest()
    })

    it("should can reggister user", async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "testing",
                name: "test"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()
    })

    
    it("should reject reggister user", async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: ""
            })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined();
    })

    
    it("should reject already reggister user", async () => {
        let result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "testing",
                name: "test"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test")
        expect(result.body.data.password).toBeUndefined()

        result = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "testing",
                name: "test"
            })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe("POST /api/users/login", function () {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeDataUserTest()
     })

     it("it should can login", async () => {
        const result = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "rahasia"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
     })
})