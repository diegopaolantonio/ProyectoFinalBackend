export default class CustomError {
  static generateCustomError({ name, message, cause, status }) {
    let customError = new Error(message, { cause });
    customError.name = name;
    if (status) {
      customError.status = status;
    } else {
      customError.status = 500;
    }
    throw customError;
  }
}
