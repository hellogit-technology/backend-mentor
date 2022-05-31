import { Schema, model } from 'mongoose';

const AccountSchema = new Schema(
  {
    username: { type: String, maxlength: 20, unique: true, required: true },
    password: { type: String, maxlength: 300, required: true },
    email: { type: String, maxlength: 100, required: true, unique: true },
    club: { type: Schema.Types.ObjectId, ref: 'Club' },
    campus: { type: Schema.Types.ObjectId, ref: 'Campus' },
    role: { type: String, maxlength: 10, required: true },
    logger: { type: Date },
    deleted_at: { type: Date }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Account', AccountSchema, 'account');
