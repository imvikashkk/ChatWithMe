import User from "../models/user.js";

const FriendRequestSentUsers = async (req, res) =>{
    console.log("come back to")
    const userId = req.userId;
    try{
        const user = await User.findById(userId).populate("sentFriendRequests", "name email image").lean();

        const sentFriendRequests = user.sentFriendRequests;
        if(sentFriendRequests.length === 0){
            return res.status(404).json({success:false, message:"not found user's friends"})
        }
        return res.status(200).json({success:true, friends:sentFriendRequests})

    }catch(error){
        console.log("Error : " , error)
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

export default FriendRequestSentUsers;