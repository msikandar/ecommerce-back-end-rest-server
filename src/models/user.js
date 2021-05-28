const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      reqired: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      reqired: true,
      trim: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      reqired: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      reqired: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_passsword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_passsword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
