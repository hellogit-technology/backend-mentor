import { Schema, model } from 'mongoose';

const AdminAccountSchema = new Schema(
  {
    fullname: { type: String, maxlength: 30, required: true },
    email: { type: String, maxlength: 100, unique: true, required: true },
    campus: { type: Schema.Types.ObjectId, ref: 'Campus' },
    role: { type: Number, max: 2, required: true },
    editor: { type: Schema.Types.ObjectId, required: true, ref: 'AdminAccount' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('AdminAccount', AdminAccountSchema, 'admin-account');
