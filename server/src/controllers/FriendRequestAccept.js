import User from "../models/user.js";


const FriendRequestAccept = async (req, res) =>{
    const senderId = req.userId;
    const recipientId = req.body.userId

    console.log(recipientId , senderId)

    if(!recipientId){
        return res.status(400).json({success: false, message: "Recipient userId is not exist in body"})
    }

    try{
        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        sender.friends.push(recipientId);
        recipient.friends.push(senderId);


        recipient.friendRequest = recipient.friendRequest.filter((request)=> request.toString() !== senderId.toString());

        sender.friendRequest = sender.friendRequest.filter((send)=> send.toString() !== recipientId.toString());

        await sender.save();
        await recipient.save();

        return res.status(200).json({success: true, message:"Friend Request Accepted Successfully" })

    }catch(err){
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }


}

export default FriendRequestAccept