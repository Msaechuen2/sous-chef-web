const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MealSchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  meals: [
    {
      title: String,
      recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
      recipeName: String,
      imageUrl: String,
      portion: { type: Number, default: 1 }, 
      ingredients: [{ type: String }],
    }
  ]
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: 6,
    select: false,
  },
  mealPlanner: [MealSchema],
  displayName: { 
    type: String, 
    default: "" 
  },
  bio: { 
    type: String, 
    default: "" 
  },
  favoriteRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("users", UserSchema);
