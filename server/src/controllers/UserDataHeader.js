import User from "../models/user.js";

const UserDataHeader = async (req, res) =>{
    try{
        const {recepientId} = req.params;

        const userData = await User.findById(recepientId).select('-password');

        return res.status(200).json({success:true, userData})
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export default UserDataHeader;