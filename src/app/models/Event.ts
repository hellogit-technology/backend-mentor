import { Schema, model } from 'mongoose';

const EventSchema = new Schema(
  {
    name: { type: String, maxlength: 300, required: true },
    date: { type: Date, required: true },
    club: { type: Schema.Types.ObjectId, required: true, ref: 'Club' },
    poster: { type: String },
    qrcode: { type: String, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Event', EventSchema, 'event');
