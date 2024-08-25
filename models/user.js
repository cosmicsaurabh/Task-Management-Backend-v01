const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      validate: [
        {
          validator: function (value) {
            return value.length >= 3; // Minimum length check
          },
          message: " First Name must be >= 3 characters.",
        },
        {
          validator: function (value) {
            return /^[A-Za-z]+$/.test(value); // No special characters or digits
          },
          message:
            "First Name can only contain letters (no digits or special characters).",
        },
      ],
    },
    lastname: {
      type: String,
      // required: [true, 'Email is required'],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email format
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: [
        {
          validator: function (value) {
            return value.length >= 6; // Minimum length check
          },
          message: "Password must be at least 6 characters long",
        },
        {
          validator: function (value) {
            return /[A-Z]/.test(value); // Uppercase letter check
          },
          message: "Password must contain at least one uppercase letter",
        },
        {
          validator: function (value) {
            return /[a-z]/.test(value); // Lowercase letter check
          },
          message: "Password must contain at least one lowercase letter",
        },
        {
          validator: function (value) {
            return /\d/.test(value); // Digit check
          },
          message: "Password must contain at least one digit",
        },
        {
          validator: function (value) {
            return /[@$!%*?&]/.test(value); // Special character check
          },
          message: "Password must contain at least one special character",
        },
      ],
    },
  },
  { timestamps: true },
);

// timestamps: true this gives us dates for when its created and updated
UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this.username.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );
  } catch (error) {
    ////console.log(error);
  }
};

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//save mylb db me store hone se ohle ye run hoga
UserSchema.pre("save", async function (next) {
  ////console.log("premethod",this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);

