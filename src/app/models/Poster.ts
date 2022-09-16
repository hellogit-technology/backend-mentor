import { Schema, model } from 'mongoose';

const PosterSchema = new Schema(
    {
      poster: {type: String, required: true}
    },
    {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
  );
  
  export default model('Poster', PosterSchema, 'poster');