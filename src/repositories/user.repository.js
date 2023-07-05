import { userDao } from "../daos/index.js";

export default class UserRepository {
  constructor() {
    this.userDao = userDao;
  }

  getUsers = async () => {
    try {
      const users = await this.userDao.getUsers();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para obtener un user especifico por email
  getUserByEmail = async (email) => {
    try {
      const user = await this.userDao.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para obtener un user especifico por el id
  getUserById = async (id) => {
    try {
      const user = await this.userDao.getUserById(id);
      if (!user) {
        return "Id not found";
      } else {
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un user al db
  createUser = async (newUser) => {
    try {
      const createdUser = await this.userDao.createUser(newUser);
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateUser = async (id, updateUser) => {
    try {
      const user = await this.userDao.updateUser(id, updateUser);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteUser = async (id) => {
    try {
      const user = await this.userDao.deleteUser(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
}
