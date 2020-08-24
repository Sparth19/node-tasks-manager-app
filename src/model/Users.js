const mongooes = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../db/mongoose')
const Task = require('./Tasks')

const userSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    }, //array of token
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, { timestamps: true })

//virtual prop for task user relationship this field will not store in the db

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//for hiding password and tokens array
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}




//generating user token
userSchema.methods.generateAuthToken = async function() {

        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, 'task-manager', { expiresIn: '2 days' })
            //for expiresIn
            /**Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
             *  If you use a string be sure you provide the time units (days, hours, etc), 
             * otherwise milliseconds unit is used by default ("120" is equal to "120ms"). */
        user.tokens = user.tokens.concat({ token })
        user.save()
        return token

    }
    //checking email and password for login for /users/login
userSchema.statics.findByCredentials = async(email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}



//MIDDLEWARE :hashing the plain text password
userSchema.pre('save', async function(next) {
    // console.log('In the save pre')
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//MIDDLEWARE : delete all the task of user if deleting the user

userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongooes.model('Users', userSchema)

module.exports = User