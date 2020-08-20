const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true
}).then((result) => {
    console.log('Mongoose Started...')
}).catch((e) => {
    console.log(e)
})