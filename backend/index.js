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
const app = express()
app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded() )


connectDB()

app.use( '/api/posts/', postRouter )
app.use( '/api/users/', userRouter )
app.use( '/api/messages/', messageRouter )


app.use( errorHandler )


app.listen( process.env.PORT, () => {
    console.log( `Server started on port:${process.env.PORT.yellow}` )
} )