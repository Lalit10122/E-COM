import express from 'express'
import { logInUser,registerUser,adminLogIn, isTokenCorrect } from '../controllers/user.controller.js'
import { Router } from 'express'


const userRouter = Router();

userRouter.post('/register',registerUser);

userRouter.post('/logIn',logInUser)

userRouter.post('/admin',adminLogIn)

userRouter.post('/token',isTokenCorrect)

export default userRouter;