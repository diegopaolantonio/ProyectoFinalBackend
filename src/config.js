import dotenv from "dotenv";

// Configuracion dotenv
dotenv.config();

// Extrae el tipo de entorno y el puerto del script de start seleccionado:
// environment: "development" o "production"
// port:        "8080"        o "5000"
// "start:dev": "nodemon ./src/app.js development 8080",
// "start:prod": "nodemon ./src/app.js production 5000",
let data = [];
process.argv.slice(2).forEach((element, index) => {
  data[index] = element;
});
const environment = data[0];
const port = data[1];

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
  port: port,
  environment: environment,
};

export default config;
