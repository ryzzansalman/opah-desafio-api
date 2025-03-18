import mongoose, { Schema } from 'mongoose';

const __UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String },
    active: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const __UserModel = mongoose.model('__User', __UserSchema, '__User');

export default __UserModel;