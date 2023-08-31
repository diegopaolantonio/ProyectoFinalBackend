import dotenv from "dotenv";

// Configuracion dotenv
dotenv.config();

// Extrae el tipo de entorno y el puerto del script de start seleccionado:
// environment: "development" o "production"
// port:        "8080"        o "5000"

// si no se especifica el environment="production" toma "development" por defecto
// si no se especifica el port toma 8080 por defecto
// "script": "nodemon ./scr/app.js "environment" "port""

// "start:dev": "nodemon ./src/app.js development 8080",
// "start:prod": "nodemon ./src/app.js production 5000",

// let data = [];
// process.argv.slice(2).forEach((element, index) => {
//   data[index] = element;
// });
// const environment = data[0] === "production" ? "production" : "development";
// const port = data[1] ? data[1] : "8080";

const config = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbUrl: process.env.DB_URL,
  sessionSecret: process.env.SESSION_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl: process.env.GITHUB_CALLBACK_URL,
  nodemailerService: process.env.NODEMAILER_SERVICE,
  nodemailerPort: process.env.NODEMAILER_PORT,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  port: process.env.PORT || 8080,
  environment: process.env.ENVIRONMENT || "development",
  // port: port,
  // environment: environment,
};

export default config;
