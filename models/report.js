import { Schema, model } from 'mongoose';


// Define the schema for data points
const DataPointSchema = new Schema({
    timestamp: { type: Date, required: true },
    active_power_kW: { type: Number, required: true },
    energy_kWh: { type: Number, required: true }
}, { _id: false }); // _id is set to false to prevent Mongoose from creating a separate _id field for each DataPoint


const ReportSchema = new Schema(
    {
        dataPoints: [DataPointSchema], // Array of data points
        facilityId: { type: Schema.Types.ObjectId, ref: 'facility', required: true }
    },
    {
        timestamps: true,
    }
);

export default model('Report', ReportSchema);
