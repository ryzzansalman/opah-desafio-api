import mongoose, { Schema } from 'mongoose';

const __SharingSchema: Schema = new Schema(
  {
    ownerId: { type: String, required: true },
    collaboratorId: { type: String, required: true },
    permission: { type: String, required: true },
  },
  { timestamps: true },
);

const __SharingModel = mongoose.model('__Sharing', __SharingSchema, '__Sharing');

export default __SharingModel;