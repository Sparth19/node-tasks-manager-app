const mongooes = require('mongoose')

require('../db/mongoose')
const taskSchema = new mongooes.Schema({
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', async(next) => {
    console.log("Task saving -by middleware")
    next()
})
const Task = mongooes.model('Tasks', taskSchema)


module.exports = Task