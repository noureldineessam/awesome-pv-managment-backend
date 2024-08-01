import { Schema, model } from 'mongoose';

const FacilitySchema = new Schema(
    {
        name: { type: String, required: true },
        nominialPower: { type: Number, required: false, default: 0 },
        userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        reports: [{ type: Schema.Types.ObjectId, ref: 'report' }],
    },
    {
        timestamps: true,
    }
);

export default model('Facility', FacilitySchema);
