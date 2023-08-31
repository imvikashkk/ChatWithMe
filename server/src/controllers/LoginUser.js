import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const LoginUser = (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password) return res.status(404).json({
        success:false,
        message:"Email and password is required !"
    });

  User.findOne({ email: email }).then((user)=>{
    if(!user){
        return res.status(400).json({success: false, message:"User does not exist !"})
    }

    if(!user.password === password) return res.status(400).json({success: false, message:"Invalid Password"})

    const token = jwt.sign({userId:user._id},"KarmaDestiny4Success@");

    return res.status(200).json({success: true, message:"Logged in successfully" , token: token})

}).catch(err=>{
    console.log("Error in LoginUser", err);
    return res.status(500).json({success: false, message:"Internal Server Error"})
})
    


}

export default LoginUser;