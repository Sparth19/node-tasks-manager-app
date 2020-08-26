const request = require('supertest')
const Task = require('../src/model/Tasks')
const app = require('../src/app')
const {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
} = require('../tests/fixtures/db')

beforeEach(setupDatabase)

test('Test case : should create task for user', async() => {
    const response = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'This is task one'
        }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()

})

test('Test case : should fetch user tasks', async() => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
})

test('Test case : should not delete other users task', async() => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send().expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()



})