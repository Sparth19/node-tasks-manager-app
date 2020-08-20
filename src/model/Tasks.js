const mongooes = require('mongoose')
require('../db/mongoose')


const Task = mongooes.model('Tasks', {
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task