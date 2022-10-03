import { Schema, model } from 'mongoose';

const ClubSchema = new Schema(
  {
    clubId: {type: String, maxlength: 30, required: true},
    name: { type: String, maxlength: 300, required: true },
    email: { type: String, maxlength: 100, unique: true, required: true },
    nickname: { type: String, maxlength: 50 },
    fanpage: { type: String, maxlength: 300 },
    slug: {type: String, maxlength: 300, required: true},
    founding: { type: Date },
    editor: {type: Schema.Types.ObjectId, required: true, ref: 'AdminAccount'}
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Club', ClubSchema, 'club');
