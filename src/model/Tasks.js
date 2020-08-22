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
    },
    owner: {
        type: mongooes.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


const Task = mongooes.model('Tasks', taskSchema)

module.exports = Task