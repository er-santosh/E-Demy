import User from "../models/user.model";

export default {
  async createUser(name, email, password) {
    const user = new User({
      name,
      email,
      password,
    });

    const createdUser = await user.save();
    if (!createdUser) {
      throw new Error("Error creating user");
    }

    createdUser.password = undefined;
    return createdUser;
  },

  async findUserById(id) {
    return await User.findById(id).select("-password").exec();
  },

  async findOneByEmail(email) {
    return await User.findOne({ email });
  },
};
