const request = require('supertest')
const User = require('../src/model/Users')
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

test('Test case:Signup new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Parth Shekhaliya',
        email: 'user1@gmail.com',
        password: 'Parth123'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()


    expect(response.body).toMatchObject({
        user: {
            name: 'Parth Shekhaliya',
            email: 'user1@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Parth123')
})

test('Test Case: Login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body.token).toBe(user.tokens[1].token)
})


test('Test case: should not login non existing user', async() => {
    await request(app).post('/users/login').send({
        email: 'notvalid@gmail.com',
        password: 'parth123'
    }).expect(400)
})

test('Test case: Authentication : should get user profile', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Test case : unauthentication: should not get profile ', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401) //401 :unauthorized
})

test('Test case : should delete user profile', async() => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Test case : should not delete user profile', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Test case: Upload profile pic', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/car1.jpg')
        .expect(200)
})


test('Test case : should update valid user', async() => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Hello new',
            password: 'Parth123'
        })
        .expect(200)

    const user = await User.findById(userOne)
    expect(user.name).toEqual('Hello new')


})
test('Test case : should not update invalid user', async() => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Hello new',
            location: 'surat'
        })
        .expect(400)
})