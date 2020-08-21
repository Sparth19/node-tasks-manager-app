require('../src/db/mongoose')
const user = require('../src/model/Users')


user.findByIdAndUpdate('5f3e6a9df819e70f889cc032', { age: 25 }).then((result) => {
    console.log(result)
    return user.countDocuments({ age: 25 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})