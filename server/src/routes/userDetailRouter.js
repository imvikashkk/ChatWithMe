import express from "express";
import GetTheUsers from "../controllers/GetTheUsers.js";
import authorization from "../middleware/authorization.js";

const userDetailRouter = express.Router();

userDetailRouter
    .get('/user',authorization, GetTheUsers)

export default userDetailRouter;