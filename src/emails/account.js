const sgMail = require('@sendgrid/mail')
const { text } = require('express')


const myEmail = 'parthshekhaliya17@gmail.com'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendingWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myEmail,
        subject: `Welcome, ${name} ! in Task Manager App.`,
        text: 'Welcome onboard ' + name + '. Now you can create your Tasks.We wish you luck for all your tasks.'
    })
}
const sendingCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myEmail,
        subject: `Thank you ${name}, for joining with us.`,
        text: 'Please give us a feedback via email so that we can serve you better and you are always welcome to join Task Manager Thank you.'
    })
}

module.exports = {
        sendingWelcomeEmail,
        sendingCancelEmail
    }
    // sgMail.send({
    //     to: 'parthshekhaliya17@gmail.com',
    //     from: 'parthshekhaliya17@gmail.com',
    //     subject: 'This is test subject',
    //     text: 'This is test text innformation'
    // })