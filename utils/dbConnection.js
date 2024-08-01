import Mongoose from 'mongoose';
import { mongoUrl } from '../config/environment.js';

let isConnected;
let db;

const connectDB = async () => {
    if (isConnected) return db;

    try {
        db = await Mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        return db;
    } catch (err) {
        throw new Error(err);
    }
};

export default connectDB;