import User from "../models/user.js";

const GetTheUsers = async (req, res) => {
  try {
    const loggedInUserId = req.userId;
    const users = await User.find({_id: {$ne: loggedInUserId}});
    return res.status(200).json({success: true, users});

  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: err });
  }
};

export default GetTheUsers;
