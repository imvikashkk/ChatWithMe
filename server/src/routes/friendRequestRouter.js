import express from "express"
import FriendRequestSend from "../controllers/FriendRequestSend.js";
import authorization from "../middleware/authorization.js";
import RequestListFriend from "../controllers/RequestListFriend.js";
import FriendRequestAccept from "../controllers/FriendRequestAccept.js";
import FriendRequestSentUsers from "../controllers/FriendRequestSentUsers.js";


const friendRequestRouter = express.Router();

friendRequestRouter
    .post('/send',authorization,FriendRequestSend)
    .get('/requests',authorization,RequestListFriend)
    .post('/accept',authorization, FriendRequestAccept)
    .get("/sent/users", authorization, FriendRequestSentUsers)

export default friendRequestRouter;
