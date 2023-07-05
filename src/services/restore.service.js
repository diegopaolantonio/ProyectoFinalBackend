import { restoreRepository } from "../repositories/index.js";

export default class RestoreService {
  constructor() {
    this.restoreRepository = restoreRepository;
  }

  getRestores = async () => {
    try {
      const restores = await this.restoreRepository.getRestores();
      return restores;
    } catch (error) {
      throw new Error(error);
    }
  };

  getRestoreByEmail = async (email) => {
    try {
      const restore = await this.restoreRepository.getRestoreByEmail(email);
      return restore;
    } catch (error) {
      throw new Error(error);
    }
  };

  getRestoreById = async (id) => {
    try {
      const restore = await this.restoreRepository.getRestoreById(id);
      return restore;
    } catch (error) {
      throw new Error(error);
    }
  };

  createRestore = async (restore) => {
    try {
      const result = await this.restoreRepository.createRestore(restore);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateRestore = async (id, updateRestore) => {
    try {
      const result = await this.restoreRepository.updateRestore(
        id,
        updateRestore
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteRestore = async (id) => {
    try {
      const result = await this.restoreRepository.deleteRestore(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteRestoreByEmail = async (email) => {
    try {
      const result = await this.restoreRepository.deleteRestoreByEmail(email);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}
