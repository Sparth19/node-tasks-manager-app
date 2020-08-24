const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((result) => {
    //console.log('Mongoose Started...')
}).catch((e) => {
    console.log(e)
})