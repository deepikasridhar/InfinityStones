const express = require('express')
const router = new express.Router()
const Message = require('../models/message')
const moment = require("moment")
module.exports = function (io) {

    io.on('connection', (socket) => { // eslint-disable-line no-shadow
    // socket.on('login', (data) => {
    //   User.findOne({ name: data.username }).then((user) => {
    //     // Check if password matches
    //     if (user.password === data.password) {
    //       // Save username in local storage
    //       socket.emit('auth success', { username: user.name })

    //       // Notify new user entered the chat
    //       // io.emit("new connection",{
    //       //     username: user.name,
    //       //     msg: `${user.name} has entered the chat`
    //       // })
    //     } else {
    //       socket.emit('auth failed')
    //       console.log('Incorrect password')
    //     }
    //   })
    //     .catch(() => {
    //       console.log('User not found. Creating new user with provided inputs.')
    //       User.create({
    //         name: data.username,
    //         password: data.password,
    //       })
    //         .then((response) => {
    //           socket.emit('auth success', {
    //             username: response.name,
    //           })

    //           // Notify new user enetered the chat
    //           // io.emit("new connection",{
    //           //     username: data.name,
    //           //     msg: `${data.name} has entered the chat`
    //           // })
    //         })
    //     })
    // })

    console.log("The Socket is open")

    socket.on('get chat history', () => {
        // Get all Chat
        Message.find().exec().then((data) => {
        const chatLog = data
        const formattedChatLog = chatLog.map((chat) => {
            // Format timestamp from UTC
            const timestamp = moment.utc(chat.timestamp).local().format('MM/DD/YYYY hh:mm:ssA')
            return { timestamp, from: chat.from, msg: chat.msg }
        })
        socket.emit('chat history', {
            chats: formattedChatLog,
        })
        }).catch(err => console.log('Loading chat error', err))
    })

    socket.on('chat message', (data) => {
        console.log("Message on Server:", data)
        const time = Date.now()
        // Message.create({
        // from: data.username,
        // msg: data.msg,
        // timestamp: time,
        // })
        // .then((response) => {
        //     const timestamp = moment(response.timestamp).format('MM/DD/YYYY hh:mm:ssA')
        //     io.emit('new chat message', {
        //     from: response.from,
        //     msg: response.msg,
        //     timestamp,
        //     })
        // })
        const timestamp = moment(time).format('MM/DD/YYYY hh:mm:ssA')
        io.emit('new chat message', {
            from: data.username,//response.from,
            msg: data.msg,//response.msg,
            timestamp,
        })

    })

    })
    return router
}
// module.exports = router