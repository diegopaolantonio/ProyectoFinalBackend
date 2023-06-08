import { messageDao } from "../daos/index.js";

export default class MessageRepository {
  constructor() {
    this.messageDao = messageDao;
  }
  //Funcion para obtener todos los datos del db
  getMessages = async () => {
    try {
      const messages = await this.messageDao.getMessages();
        return messages;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un mensaje al db
  createMessage = async (message) => {
    try {
      const createdMessage = await this.messageDao.createMessage(message);
        return createdMessage;
    } catch (error) {
      throw new Error(error);
    }
  };
}
