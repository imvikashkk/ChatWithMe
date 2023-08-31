import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportLocal from 'passport-local';
import cors from 'cors';
import authUserRouter from './src/routes/authUserRouter.js';
import userDetailRouter from './src/routes/userDetailRouter.js';
import friendRequestRouter from './src/routes/friendRequestRouter.js';
import friends from './src/routes/friends.js';
import messagesRouter from "./src/routes/messagesRouter.js"
import userDataHeader from './src/routes/userHeaderDetailRouter.js';
import chatRouter from "./src/routes/chatRouter.js"

const localStrategy = passportLocal.Strategy;
const app = express();
const PORT = 8000;



/* MiddleWare For Accessbility */
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());


/* Routers */
app.use('/api/auth', authUserRouter)
app.use('/api/users',userDetailRouter )
app.use('/api/friend-request', friendRequestRouter)
app.use('/api/user', friends)
app.use("/api/messages", messagesRouter)
app.use("/api/header/user", userDataHeader)
app.use("/api/chat", chatRouter)



/* Connecting With MongoDB and Listening The Server */
mongoose.connect("mongodb+srv://imvikashkk:Vikash2003@cluster0.5uf5h1c.mongodb.net/chatwithme?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, (err, result)=>{
        if(err){
            console.log("Error at Listening The PORT: " + PORT);
            return;
        }
        else{
            console.log("Server is running...")
        }
    });
}).catch(err=>{
console.log("Error connecting to MongoDB : ", err.message)
})



