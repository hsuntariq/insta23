import express from 'express'
import { findUser, getAllUsers, loginUser, registerUser } from '../controllers/userController.js'

export const userRouter = express.Router()


userRouter.post( '/register', registerUser )
userRouter.post( '/login', loginUser )
userRouter.get( '/find-user/:id', findUser )
userRouter.get( '/get-all-users', getAllUsers )