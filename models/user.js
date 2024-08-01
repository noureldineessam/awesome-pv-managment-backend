import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        facilities: [{ type: Schema.Types.ObjectId, ref: 'facility' }]
    },
    {
        timestamps: true,
    }
);

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


export default model('User', UserSchema);