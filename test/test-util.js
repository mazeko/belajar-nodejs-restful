import { prismaClient } from "../src/application/database"
import bcrypt from "bcrypt"

const removeDataUserTest = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestUser = async () => {
     await prismaClient.user.create({
        data: {
            username: "test",
            name: "test",
            password: await bcrypt.hash("rahasia", 10),
            token: "test"
        }
     })
}

export { removeDataUserTest, createTestUser }