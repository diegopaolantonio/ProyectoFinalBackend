export const ErrorsName = {
  CARTS_ERROR_NAME: "Carts Error",
  MESSAGES_ERROR_NAME: "Messages Error",
  PRODUCTS_ERROR_NAME: "Products Error",
  TICKETS_ERROR_NAME: "Tickets Error",
  VIEWS_ERROR_NAME: "Views Error",
  MOCKING_ERROR_NAME: "Mocking Error",
  SESSION_ERROR_NAME: "Session Error",
};

export const ErrorsMessage = {
  UTHORIZATION_ERROR_MESSAGE: "Invalid Credentials",
  GETCARTS_ERROR_MESSAGE: "Carts collection not found",
  GETCARTSBYID_ERROR_MESSAGE: "Cart does not exist",
  CREATECARTS_ERROR_MESSAGE: "Cart not created",
  ADDPRODUCTINCARTS_ERROR_MESSAGE: "Add product in cart error",
  UPDATECART_ERROR_MESSAGE: "Cart not modify",
  TICKET_ERROR_MESSAGE: "Ticket not generated",
  GETMESSAGES_ERROR_MESSAGE: "Messages collection not found",
  ADDMESSAGE_ERROR_MESSAGE: "Add message in cart error",
  GETPRODUCTS_ERROR_MESSAGE: "Products collection not found",
  GETPRODUCTSBYID_ERROR_MESSAGE: "Product does not exist",
  ADDPRODUCT_ERROR_MESSAGE: "Add product error",
  UPDATEPRODUCT_ERROR_MESSAGE: "Cart not modify",
  DELETEPRODUCT_ERROR_MESSAGE: "Delete product error",
  GETTICKETS_ERROR_MESSAGE: "Tickets collection not found",
  GETTICKETSBYID_ERROR_MESSAGE: "Tickets does not exist",
  PAGE_ERROR_MESSAGE: "Page page error",
  MOCKING_ERROR_MESSAGE: "Mocking products not created",
  USERREGISTER_ERROR_MESSAGE: "Usuario no registrado",
  USERLOGIN_ERROR_MESSAGE: "User not logged",
  USERLOGOUT_ERROR_MESSAGE: "User not logout",
  GITHUB_ERROR_MESSAGE: "Can't log user with GiyHub credentials",
};

export const ErrorsCause = {
  UTHORIZATION_ERROR_CAUSE: "User unauthorized",
  DATABASE_ERROR_CAUSE: "Conection to database",
  GETBYID_ERROR_CAUSE: "Id not found in database",
  ADDPRODUCTINCARTS_ERROR_CAUSE: "Cart id or product id not found",
  TICKET_ERROR_CAUSE: "Insufficient Stock",
  ADDPRODUCT_ERROR_CAUSE: "Invalid product data",
  UPDATEPRODUCT_ERROR_CAUSE: "Invalid product data o id",
  DELETEPRODUCT_ERROR_CAUSE: "Id not found in database",
  PAGE_ERROR_CAUSE: "Render page logic error",
  MOCKING_ERROR_CAUSE: "Faker module error",
  USERREGISTER_ERROR_CAUSE: "Invalid user data",
  USERLOGIN_ERROR_CAUSE: "Invalid user data",
  USERLOGOUT_ERROR_CAUSE: "Logout fail",
  GITHUB_ERROR_CAUSE: "Invalid credentials or connection error",
};
