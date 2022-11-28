import { Schema, model } from 'mongoose';

const DeletedClubSchema = new Schema(
  {
    originalDocument: { type: String, maxlength: 20, required: true },
    originalId: { type: Schema.Types.ObjectId, required: true },
    data: { type: Object, required: true },
    eraser: { type: Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('DeletedClub', DeletedClubSchema, 'deleted-clubs');
