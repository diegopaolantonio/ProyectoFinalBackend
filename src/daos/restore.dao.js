import { restoreModel } from "./models/restore.model.js";

export default class RestoreDao {
  getRestores = async function () {
    try {
      const restores = await restoreModel.find();
      return restores;
    } catch (error) {
      return null;
    }
  };

  getRestoreByEmail = async function (email) {
    try {
      const restore = await restoreModel.find({ email: email });
      return restore;
    } catch (error) {
      return null;
    }
  };

  getRestoreById = async function (id) {
    try {
      const restore = await restoreModel.findById(id);
      return restore;
    } catch (error) {
      return null;
    }
  };

  createRestore = async function (newRestore) {
    try {
      const restore = await restoreModel.create(newRestore);
      return restore;
    } catch (error) {
      return null;
    }
  };

  updateRestore = async function (id, updateRestore) {
    try {
      const result = await restoreModel.updateOne({ _id: id }, updateRestore);
      return result;
    } catch (error) {
      return null;
    }
  };

  deleteRestore = async function (id) {
    try {
      const result = await restoreModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      return null;
    }
  };

  deleteRestoreByEmail = async function (email) {
    try {
      const result = await restoreModel.deleteOne({ email: email });
      return result;
    } catch (error) {
      return null;
    }
  };
}
