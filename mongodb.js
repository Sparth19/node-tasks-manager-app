const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const databaseName = 'task-manager'
const databaseURL = 'mongodb://127.0.0.1:27017'

//mongodb connection
MongoClient.connect(databaseURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Connection not established..')
    }
    console.log('Connection successful..!')

    const db = client.db(databaseName)

    // db.collection('users').insertMany([{
    //         name: 'Parth',
    //         age: 22
    //     },
    //     {
    //         name: 'Rahul',
    //         age: 25
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Insertion not completed..')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([{
    //         description: 'To workout',
    //         completed: false
    //     },
    //     {
    //         description: 'To read new book',
    //         completed: false
    //     },
    //     {
    //         description: 'Eat burger',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Tasks not added..')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({
    //     name: 'Parth'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e)
    // })

    // db.collection('users').find({
    //     name: 'Parth'
    // }).toArray().then((result) => {
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e)
    // })

    // db.collection('users').updateOne({
    //     _id: new mongodb.ObjectID("5f3e2aa960aa263600836e01")
    // }, {
    //     $set: {
    //         name: 'Myself'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e)
    // })

    // db.collection('users').updateMany({
    //     name: 'Rahul'
    // }, {
    //     $set: {
    //         name: 'Hello'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e)
    // })


    // db.collection('users').deleteOne({
    //     name: 'Parth'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e)
    // })

    // db.collection('tasks').deleteMany({
    //     completed: false
    // }).then((result) => {
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e)
    // })

})