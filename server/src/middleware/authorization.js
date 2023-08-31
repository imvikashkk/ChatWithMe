import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authorization = async (req, res, next) => {
    const {authkey} = req.headers;
    if(!authkey){
        console.log("authkey is required")
        return res.status(400).json({success:false, message: "AuthKey required"})
    }
    const id = jwt.verify(authkey, "KarmaDestiny4Success@").userId;
    if(!id) {
        console.log("Invalid authkey")
        return res.status(400).json({success:false, message: "Invalid authkey"})
    }
    const user = await User.find({_id:id});
    if(!user){
        console.log("Invalid authkey");
        return res.status(400).json({success:false, message: "Invalid authkey"}) ;
    }
    req.userId = id;
    next();
}


export default authorization;