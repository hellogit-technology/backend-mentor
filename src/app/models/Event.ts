import { Schema, model } from 'mongoose';

const EventSchema = new Schema(
  {
    eventId: { type: String, maxlength: 30, required: true},
    name: { type: String, maxlength: 300, required: true },
    date: { type: Date, required: true },
    club: [{ type: Schema.Types.ObjectId, required: true, ref: 'Club' }],
    poster: { type: String },
    slug: {type: String, maxlength: 300, required: true},
    qrcode: { type: String, required: true },
    editor: {type: Schema.Types.ObjectId, required: true, ref: 'AdminAccount'}
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Event', EventSchema, 'event');
