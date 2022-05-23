import { Schema, model } from 'mongoose';

const StudentSchema = new Schema({
    fullname: {type: String, maxlength: 100},
    school_id: {type: String, maxlength: 50, required: true, unique: true},
    email: {type: String, required: true, maxlength: 100, unique: true},
    campus: {type: Schema.Types.ObjectId, ref: 'Campus'},
    position: {type: Schema.Types.ObjectId, ref: 'Position'},
    club: [{type: Schema.Types.ObjectId, ref: 'Club'}],
    deleted_at: {type: Date}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('Student', StudentSchema, 'student')