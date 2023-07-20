import { Schema, model } from "mongoose";

export interface IUser {
  username: String;
  password: String;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
