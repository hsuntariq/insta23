import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import colors from 'colors'
import { postRouter } from './routes/postRoutes.js'
import { errorHandler } from './middlewares/errorMIddleware.js'
import cors from 'cors'
import { connectDB } from './config/connect.js'
import { userRouter } from './routes/userRoutes.js'
import { messageRouter } from './routes/messageRoutes.js'

import http from 'http'
import { Server } from 'socket.io'


const app = express()


const server = http.createServer( app )


const io = new Server( server, {
    cors: 'http://localhost:5173'
} )



io.on( 'connection', ( socket ) => {
    console.log( `user connected on id:${socket.id.cyan}` )


    socket.on( 'sent_message', ( data ) => {
        socket.broadcast.emit( 'received_message', data )
    } )


    // calling / receiving


    socket.on( 'calling', ( data ) => {
        socket.broadcast.emit( 'call_a_rahi_ha', data )
    } )


    // declined call


    socket.on( 'call_declined', ( data ) => {
        socket.broadcast.emit( 'nahi_uthai', data )
    } )

    // answered

    socket.on( 'answer_call', ( data ) => {
        socket.broadcast.emit( 'utha_li_ha', data )
    } )





} )











app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded() )


connectDB()

app.use( '/api/posts/', postRouter )
app.use( '/api/users/', userRouter )
app.use( '/api/messages/', messageRouter )


app.use( errorHandler )


server.listen( process.env.PORT, () => {
    console.log( `Server started on port:${process.env.PORT.yellow}` )
} )