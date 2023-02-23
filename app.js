const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const Routes = require("./routes/pageRoute");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(Routes);

app.listen(5000);
