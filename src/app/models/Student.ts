import { Schema, model } from 'mongoose';

const StudentSchema = new Schema(
  {
    fullname: { type: String, maxlength: 100, required: true },
    school_id: { type: String, maxlength: 20, required: true, unique: true },
    email: { type: String, maxlength: 100, required: true, unique: true },
    campus: { type: Schema.Types.ObjectId, required: true, ref: 'Campus' },
    editor: { type: Schema.Types.ObjectId, required: true, ref: 'AdminAccount' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Student', StudentSchema, 'student');
