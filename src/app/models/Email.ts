import { Schema, model } from 'mongoose';

const EmailSchema = new Schema({
    title: {type: String, maxlength: 200, required: true, },
    content: {type: String, required: true},
    schedule_time: {type: Date},
    creator: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('Email', EmailSchema, 'email')