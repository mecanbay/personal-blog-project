require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const app = express();
const User = require("./models/User");

// BLOG ROUTES
const pageRouter = require("./routes/pageRouter");

// ADMIN ROUTES
const authRouter = require("./routes/adminRoutes/authRouter");

// TEMPLATE ENGINE
app.set("view engine", "ejs");

//DATABASE CONNECTION
mongoose
  .connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_COLLECTION}`
  )
  .then(() => {
    console.log("MongoDB Bağlantısı Başarıyla Gerçekleşti.");
  });

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.APP_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,

    store: mongoStore.create({
      mongoUrl: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_COLLECTION}`,
    }),
  })
);
app.use(methodOverride('_method', {
  methods : ["POST", "GET"]
}))
app.use("*", (req, res, next) => {
  res.locals.URL = `${process.env.APP_URL}:${process.env.APP_PORT}`;
  next();
});
app.use("/admin", async (req, res, next) => {
  if (req.session.userID) {
    try{
      const userRole = await User.findById(req.session.userID).populate(
        "role_id"
      );
      res.locals.create_user_perm = userRole.role_id.create_user;
      res.locals.read_user_perm = userRole.role_id.read_user;
      res.locals.update_user_perm = userRole.role_id.update_user;
      res.locals.delete_user_perm = userRole.role_id.delete_user;
      res.locals.create_role_perm = userRole.role_id.create_role;
      res.locals.read_role_perm = userRole.role_id.read_role;
      res.locals.update_role_perm = userRole.role_id.update_role;
      res.locals.delete_role_perm = userRole.role_id.delete_role;
    }
    catch(error){
      console.log("Kullanıcı rolü silinmiş!");
      req.session.destroy(() => {
        res.status(400).redirect("/admin/login")
      })
    }
    
  }
  next();
});

app.use("/", pageRouter);
app.use("/admin", authRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Sunucu ${process.env.APP_PORT} portunda ayağa kalktı.`);
});
