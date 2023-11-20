import supertest from "supertest"
import { web } from "../src/application/web.js"
import { prismaClient } from "../src/application/database.js"
import { logger } from "../src/application/logging.js"

describe("POST /api/users", function () {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "devv"
            }
        })
    })

    it("should can reggister user", async () => {
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: "devv",
                password: "testing",
                name: "mazeko"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("devv")
        expect(result.body.data.name).toBe("mazeko")
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
                username: "devvv",
                password: "testing",
                name: "mazeko"
            })

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("devvv")
        expect(result.body.data.name).toBe("mazeko")
        expect(result.body.data.password).toBeUndefined()

        result = await supertest(web)
            .post("/api/users")
            .send({
                username: "devvv",
                password: "testing",
                name: "mazeko"
            })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})