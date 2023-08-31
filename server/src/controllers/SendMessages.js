import Message from "../models/message.js";

const SendMessages = async (req, res) => {
    console.log(req.file);
  const senderId = req.userId;
  const { recepientId, messageText, messageType } = req.body;

  try {
    const newMessage = await Message({
      senderId,
      recepientId,
      messageType,
      message:messageText,
      timestamp: new Date(),
      imageUrl: messageType === "image" ? req.file.path : null,
    });
    // console.log(newMessage);
    await newMessage.save();
    return res
      .status(200)
      .json({ success: true, message: "Messaage is successfully sent" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export default SendMessages;
