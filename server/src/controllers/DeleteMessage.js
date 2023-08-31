import Message from "../models/message.js";

const DeleteMessage = async (req, res) =>{
    const userId = req.userId
    try{
        const {messages} = req.body;

        if(!Array.isArray(messages) || messages.length === 0){
            return res.status(400).json({
                success: false,
            message:"Please select a message"
            })
        }

        await Message.deleteMany({
            _id:{$in : messages}
        })

        return res.json({success: true, message:"Message Delete Successfully"})

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false ,error: "Interal server error"})
    }
}

export default DeleteMessage