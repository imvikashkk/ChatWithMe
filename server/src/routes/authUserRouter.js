import express from "express"
import RegisterUser from '../controllers/RegisterUser.js'
import LoginUser from '../controllers/LoginUser.js'

const authUserRouter = express.Router();

authUserRouter 
    .post('/register', RegisterUser)
    .post('/login', LoginUser)

export default authUserRouter