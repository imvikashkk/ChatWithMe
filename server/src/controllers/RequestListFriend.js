import User from "../models/user.js";

const RequestListFriend = async (req, res) =>{
    const userId =  req.userId;
    try{
        const user = await User.findById(userId).populate("friendRequest", "name email image").lean();

        const friendRequest = user.friendRequest

        res.status(200).json({success:true, friendRequest: friendRequest})
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message:err});
    }
}

export default RequestListFriend;