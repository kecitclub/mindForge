import mongoose from "mongoose";
import { User } from "./user.model.js";

const fireBrigadeSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    liveLocation: {
        type: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
}, { timestamps: true });

export const FireBrigade = User.discriminator('Ambulance', fireBrigadeSchema);