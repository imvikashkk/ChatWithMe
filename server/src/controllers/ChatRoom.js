import Message from "../models/message.js"

const ChatRoom = async (req, res) =>{
    try{
        const recepientId = req.params.recepientId
        const senderId = req.userId

        const messages = await Message.find({
            $or:[
                {senderId: senderId, recepientId: recepientId},
                {senderId:recepientId, recepientId:senderId}
            ]
        }).populate("senderId", "_id name");
        return res.status(200).json({success:true, messages:messages});
    }catch(err){
      console.log(err);
      return res.status(500).json({success: false, err})
    }
}

export default ChatRoom;