const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const router = require("./Routes/routes");

const app = express();
const PORT = 8080;

// sequelize.sync();
// sequelize.sync({alter:true})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(PORT, () => console.log(`Port ${PORT} is run`));
