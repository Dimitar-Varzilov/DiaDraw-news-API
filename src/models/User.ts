import { Schema, model, Document } from "mongoose";

export interface IUser {
  username: String;
  password: String;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUserModel>("Users", userSchema);
export default User;
