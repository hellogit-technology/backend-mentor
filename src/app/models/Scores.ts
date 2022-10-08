import { Timestamp } from 'mongodb';
import { Schema, model } from 'mongoose';

const ScoresSchema = new Schema(
  {
    event: [
        {
            scores: {type: String, maxlength: 3},
            event: {type: Schema.Types.ObjectId, ref: 'Event'}
        }
    ],
    attitude: [
        { 
            scores: {type: String, maxlength: 3} ,
            club: {type: Schema.Types.ObjectId, ref: 'Club'}
        }
    ],
    totalEvent: {type: Number, max: 3},
    totalAttitude: {type: Number, max: 3},
    month: {type: Number, max: 2, required: true},
    student: {type: Schema.Types.ObjectId, required: true, ref: 'Student'},
    editor: {
        userId: {type: Schema.Types.ObjectId, required: true},
        role: {type: Number, required: true}
    },
    historyEdit: [
       {
        userId: {type: Schema.Types.ObjectId, required: true},
        role: {type: Number, required: true}
       }
    ]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Scores', ScoresSchema, 'scores');