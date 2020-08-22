const tokenchecker = require('jsonwebtoken')
const User = require('../model/Users')


const auth = async(req, res, next) => {
    console.log('Auth middleware')

    try {
        const token = req.header('Authorization').replace('Bearer ', '')


        const decoded = tokenchecker.verify(token, 'task-manager')
        console.log(token)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })


        if (!user) {
            throw new Error()
        }

        req.user = user

        next()
    } catch (e) {
        res.status(401).send({ error: "Authentication Required" })
    }
}
module.exports = auth


// app.use((req, res, next) => {
//     res.status(503).send("Under maintenance")
// })