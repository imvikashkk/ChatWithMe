import User from "../models/user.js";


const FriendRequestSend = async (req, res) =>{
    const sender = req.userId;
    const recipient = req.body.userId
    if(!recipient){
        return res.status(400).json({success: false, message: "Recipient userId is not exist in body"})
    }

    try{
        /* //? Update The Recepient's friendRequest Array */

            await User.findByIdAndUpdate(recipient, {
                $push:{friendRequest: sender}
            }).then((res)=>{console.log("recipient updated")}).catch((err)=>{
                return res.status(500).json(err)
            }) ;

        /* //? Update The Sender's sentFriendRequests Array */
            await User.findByIdAndUpdate(sender, {
                $push:{sentFriendRequests: recipient}
            }).then((res)=>{console.log("sender updated")}).catch((err)=>{
                return res.status(500).json(err)
            }) ;

            return res.status(200).json({success: true, message:"friendRequest Creation Success"});
    }catch(err){
        return res.status(500).json({success: false, message: err});
    }


}

export default FriendRequestSend