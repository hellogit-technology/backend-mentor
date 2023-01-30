import { Schema, model } from 'mongoose';

const ClubSchema = new Schema(
  {
    clubId: { type: String, maxlength: 30, required: true },
    name: { type: String, maxlength: 300, required: true },
    email: { type: String, maxlength: 100, unique: true, required: true },
    campus: { type: Schema.Types.ObjectId, required: true, ref: 'Campus' },
    nickname: { type: String, maxlength: 50, required: true },
    fanpage: { type: String, maxlength: 300, required: true },
    founding: { type: Date },
    avatar: {
      photo: { type: String, required: true },
      cloudinaryId: { type: String, required: true }
    },
    slug: { type: String, maxlength: 300, required: true },
    editor: { type: Schema.Types.ObjectId, required: true, ref: 'AdminAccount' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Club', ClubSchema, 'club');
