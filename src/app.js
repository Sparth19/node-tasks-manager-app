const express = require('express')
const chalk = require('chalk')
const app = express()
const user = require('./model/Users')
const task = require('./model/Tasks')
const User = require('./model/Users')
const Task = require('./model/Tasks')

const port = process.env.PORT || 3000
app.use(express.json())
app.post('/users', (req, res) => {

    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)

    }).catch((err) => {
        res.status(400).send(err)
    });
})
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((result) => {
        res.status(200).send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById({ _id: _id }).then((result) => {
        if (!result) {
            return res.status(404).send()
        }
        res.status(200).send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((result) => {
        res.status(200).send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById({ _id: _id }).then((result) => {
        if (!result) {
            return res.status(404).send()
        }
        res.status(200).send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
})


app.listen(port, () => {
    console.log(chalk.greenBright.inverse("Server is on !"))
})