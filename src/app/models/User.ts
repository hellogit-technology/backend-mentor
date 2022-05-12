import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: {type: String, required: true, maxlength: 50, unique: true},
    password: {type: String, required: true, maxlength: 255},
    fullname: {type: String, required: true, maxlength: 100},
    email: {type: String, required: true, maxlength: 100, unique: true},
    school_id: {type: String, required: true, maxlength: 50, unique: true},
    campus: {type: Schema.Types.ObjectId, required: true, ref: 'Campus'},
    role: {type: String, required: true, maxlength: 20},
    club: {type: Schema.Types.ObjectId, ref: 'Club'},
    deleted_at: {type: Date}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('User', UserSchema, 'user')