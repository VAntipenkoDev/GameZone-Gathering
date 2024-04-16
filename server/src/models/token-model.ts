import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IToken {
  refreshToken: string;
  user: typeof Schema.Types.ObjectId;
}

const tokenShema = new Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  refreshToken: { type: String, required: true },
});

export const TokenModel = mongoose.model(
  'Token',
  tokenShema,
);
