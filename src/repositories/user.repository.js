import { userDao } from "../daos/index.js";

export default class UserRepository {
  constructor() {
    this.userDao = userDao;
  }

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
      // if (!createdUser) {
      //   return "Add user error";
      // } else {
        return createdUser;
      // }
    } catch (error) {
      throw new Error(error);
    }
  };
}
