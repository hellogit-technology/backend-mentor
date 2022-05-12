import { Schema, model } from 'mongoose';

const ClubSchema = new Schema({
    name: {type: String, maxlength: 50, required: true},
    founding: {type: Date},
    leader: {type: String, maxlength: 20, required: true},
    people: {type: Number, max: 900},
    creator: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    deleted_at: {type: Date}
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

export default model('Club', ClubSchema, 'club')