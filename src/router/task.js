const express = require('express')
const Task = require('../model/Tasks')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body)

    const task = new Task({
        //... ES6 spread operator it will copy
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})


//GET /tasks?completed=true
//GET /tasks?limit=10&skip=2
router.get('/tasks', auth, async(req, res) => {
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        //...match to copy
        const tasks = await Task.find({...match,
            'owner': req.user._id,
        }).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))

        res.status(200).send(tasks)


        // await req.user.populate('task').execPopulate()
        // res.send(req.user.tasks)

    } catch (error) {
        res.status(500).send(error)
    }

    // Task.find({}).then((result) => {
    //     res.status(200).send(result)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})



router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById({ _id })

        const task = await Task.findOne({ _id, 'owner': req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)

    } catch (e) {
        res.status(500).send(e)
    }

    // Task.findById({ _id: _id }).then((result) => {
    //     if (!result) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(result)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})
router.patch('/tasks/:id', auth, async(req, res) => {
    const taskKey = Object.keys(req.body)
    const allowed = ['description', 'completed']
    const isValid = taskKey.every((result) => allowed.includes(result))

    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates.." })
    }

    try {
        const task = await Task.findOneAndUpdate({ '_id': req.params.id, 'owner': req.user._id })
            // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send(task)
        }
        taskKey.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.status(200).send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router