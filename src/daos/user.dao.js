import { userModel } from "./models/user.model.js";

export default class UserDao {
  getUserByEmail = async function (email) {
    try {
      const user = await userModel.findOne(email);
      return user;
    } catch (error) {
      return null;
    }
  };

  getUserById = async function (id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      return null;
    }
  };

  createUser = async function (newUser) {
    try {
      const createdUser = await userModel.create(newUser);
      return createdUser;
    } catch (error) {
      return null;
    }
  };
}
