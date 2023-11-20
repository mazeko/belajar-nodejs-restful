import Joi from "joi"

const userRegisterValidation = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
})

const loginUserValidation = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().max(100).required()
});

export { userRegisterValidation, loginUserValidation }