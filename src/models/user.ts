// import { Mode } from 'fs';
import mongoose, { model, Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser {
  username: string;
  password: string;
  isAdmin: boolean;
  comparePassword(a:string): boolean;
}
interface UserModel extends IUser, Model<IUser> {}
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false, default: false },
});
UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string,
  next:any
) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};
const User = model<IUser>("User", UserSchema);
export default User;
