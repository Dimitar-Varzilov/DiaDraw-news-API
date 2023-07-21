import { Schema, model, Document } from "mongoose";

export interface IUser {
  username: string;
  password: string;
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
    minlength: 8,
  },
});

const User = model<IUserModel>("Users", userSchema);
export default User;
