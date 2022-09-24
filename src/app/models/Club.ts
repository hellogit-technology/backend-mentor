import { Schema, model } from 'mongoose';

const ClubSchema = new Schema(
  {
    name: { type: String, maxlength: 300, required: true },
    email: { type: String, maxlength: 100, unique: true, required: true },
    nickname: { type: String, maxlength: 50 },
    fanpage: { type: String, maxlength: 300 },
    founding: { type: Date }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Club', ClubSchema, 'club');
