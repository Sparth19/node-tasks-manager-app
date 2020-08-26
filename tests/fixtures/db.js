const User = require('../../src/model/Users')
const Task = require('../../src/model/Tasks')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId
const userTwoId = new mongoose.Types.ObjectId

const userOne = {
    _id: userOneId,
    name: 'TempUser',
    email: 'tempuser@gmail.com',
    password: 'Parth123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY)
    }]
}


const userTwo = {
    _id: userTwoId,
    name: 'TempUser 2',
    email: 'tempuser2@gmail.com',
    password: 'Parth123',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET_KEY)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description: "task one",
    completed: true,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description: "task two",
    completed: false,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId,
    description: "task three",
    completed: true,
    owner: userTwoId
}

const setupDatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}


module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}