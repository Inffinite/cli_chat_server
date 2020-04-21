const socket = require('socket.io')
const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const emoji = require('node-emoji')

const app = express()
const port = process.env.PORT 

app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const server = app.listen(port, () => {
    console.log(chalk.yellow('[+]' + emoji.get('pizza') + ' The server is up on port ' + port))
})

let io = socket(server)

io.set('origins', '*:*')
io.on("connection", (socket) => {
    const data = '[****' + emoji.get('pizza') + '****]' + ' Welcome to the edge of the internet. Niaje buda!'
    io.emit('Fuckery', data)

    socket.on('newMessage', (data) => {
        socket.broadcast.emit('incomingMessage', data )
    })

    io.on('disconnect', () => {
        const data = emoji.get('tophat') + ' Your chat buddy went offline.'
        socket.broadcast.emit('disconnect', data)
    })
})