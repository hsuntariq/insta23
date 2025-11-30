import express from 'express'
import { addComments, addLikes, addPost, getPosts } from '../controllers/postController.js'
export const postRouter = express.Router()



postRouter.post( '/add-post/:user_id', addPost )
postRouter.get( '/get-post', getPosts )
postRouter.post( '/add-comment/:post_id/:user_id', addComments )
postRouter.post( '/add-likes/:post_id/:user_id', addLikes )