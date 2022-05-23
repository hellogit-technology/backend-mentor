import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    name: {type: String, maxlength: 50, required: true, unique: true},
    short: {type: String, maxlength: 10, required: true, unique: true},
    deleted_at: {Date}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('Role', RoleSchema, 'role')