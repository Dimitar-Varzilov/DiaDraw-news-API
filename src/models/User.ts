import { Schema, model, Document } from "mongoose";

export interface registerDto {
  email: string;
  fullName: string;
  password: string;
}

export interface loginDto {
  email: string;
  password: string;
}

export interface IUserSchema {
  email: string;
  fullName: string;
  authentication: {
    password: string;
    salt: string;
  };
}

export interface IUserModel extends IUserSchema, Document {}

const userSchema: Schema<IUserSchema> = new Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
  },
});

const User = model<IUserModel>("Users", userSchema);

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserById = (id: string) => User.findById(id);
export const createUser = async (user: IUserSchema) => {
  try {
    const generatedUser = new User(user);
    const savedUser = await generatedUser.save();
    return savedUser.toObject();
  } catch (error) {
    throw Error("Error creating user");
  }
};
export const updateUserInDb = async (id: string, user: IUserSchema) => {
  try {
    const userFromDb = await getUserById(id);
    if (!userFromDb) return null;
    const updatedUser = userFromDb.set(user);
    const savedUser = await updatedUser.save();
    return savedUser.toObject();
  } catch (error) {
    throw Error("Error creating user");
  }
};
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);

export default User;
