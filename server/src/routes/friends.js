import express from 'express';
import authorization from '../middleware/authorization.js';
import GetFriends from "../controllers/GetFriends.js"
import FriendList from '../controllers/FriendList.js';

const friends = express.Router();

friends
    .get('/friends', authorization, GetFriends)
    .get("/friendlist", authorization, FriendList)

export default friends;