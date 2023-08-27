const { Schema, model } = require("mongoose");
const comments = require("./comments");

const bcrypt = require("bcrypt");

const messageSchema = require("./message");

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },

  description: {
    type: String,
  },
  
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [comments],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [messageSchema],
},{
  virtuals:true
}
);
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
