import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
    name: {type: String, maxlength: 100, required: true},
    founding: {type: Date, required: true},
    performer: {type: String, maxlength: 100, required: true},
    deleted_at: {type: Date}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('Event', EventSchema, 'event')