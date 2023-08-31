import User from '../models/user.js'

const RegisterUser = async (req, res) =>{

    const {name, email, password, image} = req.body;

     /* Create a new user request */
     const newUser = new User({
        name,
        email,
        password,
        image
     })

     /* Save the user to DB */
     await newUser.save().then(()=>{
    res.status(201).json({success:true, message:"User Registered Successfully !"})
    }).catch((err)=>{
        console.log("Error Registering The User : \n", err);
        res.status(500).json({success:false, message:"Error At Registering The User"});
    })

}


export default RegisterUser;