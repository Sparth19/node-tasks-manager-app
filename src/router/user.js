const express = require('express')
const User = require('../model/Users')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)

    // }).catch((err) => {
    //     res.status(400).send(err)
    // });
})


router.post('/users/login', async(req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
            //auth token
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})


//authentication given
router.get('/users/me', auth, async(req, res) => {

    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.status(200).send(users)
    // } catch (error) {
    //     res.status(500).send(error)
    // }

    // User.find({}).then((result) => {
    //     res.status(200).send(result)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})


router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send('Logout Success')

    } catch (e) {
        res.status(500).send(e)
    }
})


router.post('/users/logoutAll', auth, async(req, res) => {

    try {

        req.user.tokens = []

        await req.user.save()
        res.status(200).send('Logout All Success')

    } catch (e) {
        res.status(500).send(e)
    }

})


//not required

/*
router.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById({ _id: _id })
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }

    // User.findById({ _id: _id }).then((result) => {
    //     if (!result) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(result)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

*/


//update
router.patch('/users/me', auth, async(req, res) => {

    const userKey = Object.keys(req.body)
    const allowed = ['name', 'email', 'password', 'age']
    const isValid = userKey.every((data) => allowed.includes(data))

    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" })
    }

    try {

        // const user = await User.findById(req.params.id)

        userKey.forEach((userprop) => {
            req.user[userprop] = req.body[userprop]
        })

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // if (!user) {
        //     return res.status(404).send()
        // }

        res.status(200).send(req.user)

    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router