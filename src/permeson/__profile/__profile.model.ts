import mongoose, { Schema } from 'mongoose';

const __ProfileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String },
    userId: { type: String },
  },
  { timestamps: true },
);

const __ProfileModel = mongoose.model('__Profile', __ProfileSchema, '__Profile');

export default __ProfileModel;