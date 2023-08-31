import express from "express"
import RegisterUser from '../controllers/RegisterUser.js'
import LoginUser from '../controllers/LoginUser.js'
import authorization from "../middleware/authorization.js";
import UserDataHeader from "../controllers/UserDataHeader.js";

const userDataHeader = express.Router();

userDataHeader
    .get("/:recepientId", authorization, UserDataHeader)

export default userDataHeader;
