const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {createUserToken} = require('../services/auth');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
  const user = await this.findOne({email: email});
  if(!user) throw new Error('User not found');
  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedPassword = createHmac("sha256", salt)
  .update(password)
  .digest('hex');

  if(hashedPassword !== userProvidedPassword) throw new Error('Incorrect password');

  return createUserToken(user);
})

const User = model("user", userSchema);
module.exports = User;
