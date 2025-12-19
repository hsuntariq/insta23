import express from 'express'
import { getMyMessages, sendMessage } from '../controllers/messageController.js'
export const messageRouter = express.Router()


messageRouter.post( '/send-message/:sender_id/:receiver_id', sendMessage )
messageRouter.get( '/get-messages/:sender_id/:receiver_id', getMyMessages )