import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IUser {
  login?: string;
  email: string;
  isAdmin: boolean;
  password: string;
  _id: string;
}

const userShema = new Schema<IUser>({
  login: { type: String },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, require: true, unique: true },

  password: {
    type: String,
    require: true,
  },
});

export const UserModel = mongoose.model('User', userShema);
