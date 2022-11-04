// 1. create a scheme
// 2. using that create a model
// 3. export the model
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// typescript defenition for userSchema
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

// pre save hook to hash the password
userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    // not modified password
    return next();
  }
  // if password has been modified
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

// utility to compare provided password and hash
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
