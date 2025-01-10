import express, { urlencoded } from "express";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import fileRouter from "./routes/file-routes.js";
import Store from "connect-mongodb-session";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import './config/cloudinary-config.js'
const port = 3000;
const app = express();
const mongodbUri = process.env.MONGODB_URI;
mongoose.connect(mongodbUri);
mongoose.connection.on("connected", () => {
  app.listen(port, () => {
    console.log("App is running on http://localhost:" + port);
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(urlencoded({ extended: true }));
const MongooseSession = Store(session);

const store = new MongooseSession({
  uri: mongodbUri,
  collection: "documentSession",
});
const cookie = {
  http: true,
  same: "lax",
  secure: false,
};
app.use(
  session({
    secret: "nonchallant kittens",
    resave: false,
    saveUninitialized: false,
    store,
    cookie,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("tiny"));

app.use("/", userRoutes);
const auth = (req, res, next) => {
  res.locals.user = req.user;
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "user is not Authenticated" });
  }
};
app.use(auth);
app.use("/", fileRouter);

app.use((req, res) => {
  res.status(400).json({ message: "Bad Request" });
});
