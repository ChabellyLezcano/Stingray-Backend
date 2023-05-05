const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path')
const { dbConnection } = require("./database/config");

require("dotenv").config();

// Crear aplicación de express
const app = express();

// Base de datos
dbConnection();

//Directorio publico
const publicDirectoryPath = path.join(__dirname, '../public');
const uploadsDirectoryPath = path.join(publicDirectoryPath, 'uploads');

app.use(express.static(publicDirectoryPath));

// Si quieres definir la ruta /uploads como directorio público:
app.use('/uploads', express.static(uploadsDirectoryPath));

// O si quieres mantener la ruta original:
app.use(express.static(uploadsDirectoryPath));

// CORS
app.use(
  cors({
    exposedHeaders: ["x-token"],
  })
);

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tratamiento", require("./routes/tratamiento"));
app.use("/api/perfil", require("./routes/perfil"));
app.use("/api/doctor", require("./routes/doctor"));
app.use("/api/paciente", require("./routes/paciente"));
app.use("/api/producto", require("./routes/producto"));
app.use("/api/cita", require("./routes/cita"));
app.use("/api/evento", require("./routes/evento"));

//Inicio del servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});