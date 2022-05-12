import { Schema, model } from 'mongoose';

const CampusSchema = new Schema({
    name: {type: String, maxlength: 50, required: true},
    deleted_at: {type: Date}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('Campus', CampusSchema, 'campus')