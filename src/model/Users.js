const mongooes = require('mongoose')
const validator = require('validator')
require('../db/mongoose')


const User = mongooes.model('Users', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        required: true,
        validate(v) {
            if (v.toLowerCase().includes("password")) {
                throw new Error('password must not contain "password"')
            }
        }
    },
    age: {
        type: Number,
        trim: true,
        validate(v) {
            if (v < 0) {
                throw new Error("Age cant be nagative")
            }
        }
    }
})

module.exports = User