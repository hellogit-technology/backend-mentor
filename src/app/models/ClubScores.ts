import { Schema, model } from 'mongoose';

const ClubScoresSchema = new Schema(
  {
    clubScores: [
      {
        memberId: { type: String, required: true, ref: 'Student' },
        position: { type: Number, required: true, max: 2 },
        scores: { type: Number, required: true, max: 3 }
      }
    ],
    month: { type: Number, max: 2, required: true },
    clubId: { type: Schema.Types.ObjectId, required: true, ref: 'Club' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('ClubScores', ClubScoresSchema, 'club-scores');
