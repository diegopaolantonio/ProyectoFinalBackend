import { messageDao } from "../daos/index.js";

export default class MessageRepository {
  constructor() {
    this.messageDao = messageDao;
  }
  //Funcion para obtener todos los datos del db
  getMessages = async () => {
    try {
      const messages = await this.messageDao.getMessages();
      // if (!messages) {
      //   return "Get messages error";
      // } else {
        return messages;
      // }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un mensaje al db
  createMessage = async (message) => {
    try {
      console.log(message);
      const createdMessage = await this.messageDao.createMessage(message);
      // if (!createdMessage) {
      //   return "Add messages error";
      // } else {
        return createdMessage;
      // }
    } catch (error) {
      throw new Error(error);
    }
  };
}
