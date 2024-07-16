import User from "../Models/user.js";
export const findUser = async (req, res) => {
  const id = req.query.id;
  // console.log(id);
  const keyword = req.query.search
    ? { userName: { $regex: req.query.search, $options: "i" } }
    : {};
  try {
    const users = await User.find(keyword)
      .find({ _id: { $ne: id } })
      .select("userName _id profilePic");
    if (users) {
      res.status(201).json({
        users,
      });
    } else {
      res.status(400).json({
        message: "no user found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "error",
    });
  }
};
