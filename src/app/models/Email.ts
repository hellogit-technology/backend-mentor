import { Schema, model } from 'mongoose';

const EmailSchema = new Schema({
    
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});