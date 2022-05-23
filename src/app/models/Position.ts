import { Schema, model } from 'mongoose';

const PositionSchema = new Schema({
    name: {type: String, maxlength: 100, required: true}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('Position', PositionSchema, 'position')