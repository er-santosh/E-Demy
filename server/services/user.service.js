import User from "../models/user.model";

export default {
  async userInfo(id) {
    return await User.findById(id).select("-password").exec();
  },
};
