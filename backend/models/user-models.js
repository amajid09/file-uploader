import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
//define the structure of the documents that going to be stored in collection
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw Error("Please fill in the fields");
  }

  const exist = await this.findOne({ username });

  if (exist) {
    throw Error("Username exists");
  }

  if (!validator.isEmail(username)) {
    throw Error("Not a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    const missing = validatePassword(password);
    throw Error("password is not strong" + missing);
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, password: hash });

  return user;
};
const User = mongoose.model("users", userSchema);

function validatePassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const missingFromPassword = [];
  if (!hasUppercase) {
    missingFromPassword.push("an upppercase letter");
  }
  if (!hasLowercase) {
    missingFromPassword.push("a lowercase letter");
  }
  if (!hasNumber) {
    missingFromPassword.push("a number");
  }
  if (!hasSymbol) {
    missingFromPassword.push("a symbol(!@#$%^&)");
  }
  return `, password is missing ${missingFromPassword.join(" ")}`;
}

export default User;
