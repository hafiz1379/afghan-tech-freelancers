import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } catch (error) {
    return next(createError(404, "User could not be deleted"));
  }
};
