import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { userRegisterValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"

const register = async (request) => {
    const user = validate(userRegisterValidation, request)
    const userExist = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })
    
    if(userExist){
        throw new ResponseError(400, "Username already exists")
    }

    user.password = await bcrypt.hash(user.password, 10)
    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })
}

export default { register }