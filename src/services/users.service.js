import { userRepository } from "../repositories/index.js";

export default class UserService {
  constructor() {
    this.userRepository = userRepository;
  }

  getUsers = async () => {
    try {
      const users = await this.userRepository.getUsers();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.userRepository.getUserById(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  createUser = async (newUser) => {
    try {
      const user = await this.userRepository.createUser(newUser);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateUser = async (id, updateUser) => {
    try {
      const user = await this.userRepository.updateUser(id, updateUser);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteUser = async (id) => {
    try {
      const user = await this.userRepository.deleteUser(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
}
