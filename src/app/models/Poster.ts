import { Schema, model } from 'mongoose';

const PosterSchema = new Schema(
  {
    poster: [
      { 
        photo: {type: String, required: true},
        cloudinaryId: {type: String, required: true}
      }
    ],
    month: {type: Number, max: 2, required: true}
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export default model('Poster', PosterSchema, 'poster');
