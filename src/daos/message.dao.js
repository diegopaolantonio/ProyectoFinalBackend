import { messageModel } from "./models/message.model.js";

export default class MessageDao {
  getMessages = async function () {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (error) {
      return null;
    }
  };

  createMessage = async function (message) {
    try {
      const createdMessage = await messageModel.create(message);
      return createdMessage;
    } catch (error) {
      return null;
    }
  };
}
