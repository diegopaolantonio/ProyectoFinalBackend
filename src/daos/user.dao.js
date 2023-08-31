import { userModel } from "./models/user.model.js";

export default class UserDao {
  getUsers = async function () {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      return null;
    }
  };

  deleteInactiveUser = async function () {
    try {
      let deletedUsers = [];
      var currentDate = new Date();
      var dateInMlSeconds = currentDate.getTime();
      var subMlSeconds = 2 * 24 * 60 * 60 * 1000;
      // 5 minutos = 5 * 60 * 1000 ( minutos * segundos/minuto * 1000 miliseg/segundo )
      // 1 hora = 60 * 60 * 1000 ( minutos * segundos/minuto * 1000 miliseg/segundo )
      // 2 dias = 2 * 24 * 60 * 60 * 1000 ( dias * horas/dia * minutos/hora * segundos/minuto * 1000 miliseg/segundo )
      const dateTime = new Date(dateInMlSeconds - subMlSeconds);
      const users = await userModel.find({
        last_connection: { $lt: dateTime },
      });
      users.forEach(async (user, index) => {
        deletedUsers.push(user.email);
        await userModel.deleteOne({ email: user.email });
      });

      return deletedUsers;
    } catch (error) {
      return null;
    }
  };

  getUserByEmail = async function (email) {
    try {
      const user = await userModel.findOne({ email: email });
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
  };
}
