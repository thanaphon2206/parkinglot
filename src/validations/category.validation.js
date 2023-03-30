const { Joi } = require('express-validation')

const category = {
  body: Joi.object({
    icon: Joi.string().required(),
    categoryName: Joi.string().required(),
  }),
}

const register = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.string().min(4).valid(Joi.ref('password')).required(),
  }),
}

module.exports = { category, register }
