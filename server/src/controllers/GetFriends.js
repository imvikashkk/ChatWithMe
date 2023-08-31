import User from "../models/user.js";
const GetFriends = async (req, res) =>{
    const loggedInUser = req.userId;
    try{
        const user = await User.findById(loggedInUser).populate("friends", "name email image");

        return res.status(200).json({success:true, user})   
    }
    catch(err){
        console.log("Failed while fetching friends in server")
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

export default GetFriends