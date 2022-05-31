import { Schema, model } from 'mongoose';

const AttitudeSchema = new Schema(
  {
    score: { type: Number, max: 100, required: true },
    month: { type: String, maxlength: 20, required: true },
    student: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    deleted_at: { type: Date }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Attitude', AttitudeSchema, 'attitude');
