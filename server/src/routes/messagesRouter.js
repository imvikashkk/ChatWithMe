import express from 'express';
import authorization from '../middleware/authorization.js';
import SendMessages from "../controllers/SendMessages.js";
import multer from 'multer';
import DeleteMessage from '../controllers/DeleteMessage.js';

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "files/"); // Specify the desired destination folder
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  
const messagesRouter = express.Router();
messagesRouter
    .post('/send',authorization, upload.single('imageFile') , SendMessages)
    .post('/delete', authorization, DeleteMessage)

export default messagesRouter;
