import { restoreDao } from "../daos/index.js";

export default class RestoreRepository {
  constructor() {
    this.restoreDao = restoreDao;
  }

  getRestores = async () => {
    try {
      const restores = await this.restoreDao.getRestores();
      return restores;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para obtener un user especifico por email
  getRestoreByEmail = async (email) => {
    try {
      const restore = await this.restoreDao.getRestoreByEmail(email);
      if (!restore) {
        return "Email not found";
      } else {
        return restore;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para obtener un user especifico por el id
  getRestoreById = async (id) => {
    try {
      const restore = await this.restoreDao.getRestoreById(id);
      if (!restore) {
        return "Id not found";
      } else {
        return restore;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un user al db
  createRestore = async (restore) => {
    try {
      const createRestore = await this.restoreDao.createRestore(restore);
      return createRestore;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteRestoreByEmail = async (email) => {
    try {
      const result = await this.restoreDao.deleteRestoreByEmail(email);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}
