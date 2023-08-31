import User from "../models/user.js"


const FriendList = async (req, res) =>{
    const userId = req.userId
    try{
        console.log("come")
       User.findById(userId).populate("friends").then((user)=>{
        if(!user){
            return res.status(404).json({
                success: false,
                message:"User is not found"
            })
        }else{
            const friendIds = user.friends.map((friend)=> friend._id);
            return res.status(200).json({success: true, friendIds})
        }
       })

    }catch(err){
        console.log("Error :" , err)
        return res.status({success:false, err})
    }
}

export default FriendList;