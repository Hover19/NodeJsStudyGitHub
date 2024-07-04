const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// FOR HANDLEBARS
// const { engine } = require("express-handlebars");

const app = express();

const errorController = require("./controllers/error");

// FOR EJS
app.set("view engine", "ejs");
app.set("views", "views");

// FOR HANDLEBARS
// app.engine(
//   "hbs",
//   engine({
//     extname: "hbs",
//     defaultLayout: "main-layout",
//     layoutsDir: "views/layouts/",
//   })
// );
// app.set("view engine", "hbs");

// FOR PUG USAGE
// app.set("view engine", "pug");
// app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/favicon.ico", (req, res) => {
  // Send a 204 No Content status to stop the browser from requesting the favicon repeatedly
  res.status(204).send();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Error);

app.listen(3000);
