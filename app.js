const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listRoute = require("./routes/listRoute");
const newlistRoute = require("./routes/newlistRoute");
const cookieParser = require("cookie-parser");

mongoose
  .connect(
    "mongodb://IvanB:arsfuturatest@cluster0-shard-00-00.my9yh.mongodb.net:27017,cluster0-shard-00-01.my9yh.mongodb.net:27017,cluster0-shard-00-02.my9yh.mongodb.net:27017/Too-doo?ssl=true&replicaSet=atlas-mxmouq-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(listRoute);
app.use(newlistRoute);
