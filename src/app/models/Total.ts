import { Schema, model } from 'mongoose';

const TotalSchema = new Schema(
  {
    attitude: { type: Number, max: 100, required: true },
    event: { type: Number, max: 100, required: true },
    student: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    deleted_at: { type: Date }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Total', TotalSchema, 'total');
