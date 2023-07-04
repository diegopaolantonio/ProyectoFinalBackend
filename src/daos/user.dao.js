import { userModel } from "./models/user.model.js";

export default class UserDao {
  getUsers = async function () {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      return null;
    }
  }

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

  updateUser = async function (id, updateUser) {
    try {
      const user = await userModel.updateOne({ _id: id }, updateUser);
      return user;
    } catch (error) {
      return null;
    }
  };

  deleteUser = async function (id) {
    try {
      const user = await userModel.deleteOne({ _id: id });
      return user;
    } catch (error) {
      return null;
    }
  }
}
