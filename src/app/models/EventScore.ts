import { Schema, model } from 'mongoose';

const EventScoreSchema = new Schema(
  {
    score: { type: Number, max: 100, required: true },
    month: { type: String, maxlength: 20, required: true },
    student: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    deleted_at: { type: Date }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('EventScore', EventScoreSchema, 'event_score');
