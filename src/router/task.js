const express = require('express')
const Task = require('../model/Tasks')
const router = new express.Router()

router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)
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

router.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.find({}).then((result) => {
    //     res.status(200).send(result)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById({ _id })
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
router.patch('/tasks/:id', async(req, res) => {
    const taskKey = Object.keys(req.body)
    const allowed = ['description', 'completed']
    const isValid = taskKey.every((result) => allowed.includes(result))

    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates.." })
    }

    try {
        const task = await Task.findById(req.params.id)

        taskKey.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send(task)
        }
        res.status(200).send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router