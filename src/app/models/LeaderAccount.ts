import { Schema, model } from 'mongoose';

const LeaderAccountSchema = new Schema(
  {
    fullname: { type: String, maxlength: 50, required: true },
    email: { type: String, maxlength: 100, unique: true, required: true },
    schoolId: { type: String, maxlength: 30, unique: true, required: true },
    campus: { type: Schema.Types.ObjectId, required: true, ref: 'Campus' },
    club: { type: Schema.Types.ObjectId, required: true, ref: 'Club' },
    editor: { type: Schema.Types.ObjectId, required: true, ref: 'AdminAccount' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('LeaderAccount', LeaderAccountSchema, 'leader-account');
