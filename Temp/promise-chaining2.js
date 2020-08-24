require('../src/db/mongoose')
const task = require('../src/model/Tasks')

task.findByIdAndDelete('5f3e6bc7b5f60d43ec09587c').then((result) => {
    console.log(result)
    return task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})