import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user-models.js";
import bcrypt from "bcrypt";
const userRoutes = Router();

const strategy = new Strategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    console.log("in the strategy");

    if (!user) {
      console.log("hello, Im in here");
      return done(null, false, { message: "User does not exist" });
    }

    if (!user.username) {
      return done(null, false, { message: "Incorrect username" });
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return done(err);
      if (!res) {
        return done(null, false, { message: "Incorrect password" });
      }
    });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.use(strategy);

const serializeUser = (user, done) => {
  console.log("serializing the user...");
  done(null, { username: user.username, id: user._id });
};

passport.serializeUser(serializeUser);

const deserializeUser = async (userId, done) => {
  try {
    const user = await User.findOne({ _id: userId.id });
    console.log("deserializing the user...");
    done(null, user.username);
  } catch (err) {
    done(err);
  }
};

passport.deserializeUser(deserializeUser);

const auth = (req, res) => {
  res.locals.user = req.user;
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "user is not Authenticated" });
  }
};

userRoutes.post(
  "/login",
  passport.authenticate("local", {
    successMessage: true,
    failureMessage: true,
  }),
  auth
);

userRoutes.get("/auth", auth);

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "User is logged out." });
  });
};

userRoutes.get("/logout", logout);

const signUp = async (req, res) => {
  const { username, password } = req.body;
  console.log("in the sign up route");
  try {
    const user = await User.signup(username, password);
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Error" });
      res.status(200).json({ message: "Sucesss", user });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

userRoutes.post("/sign-up", signUp);

export default userRoutes;
