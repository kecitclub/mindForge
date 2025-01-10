import mongoose from "mongoose";
import { User } from "./user.model.js";

const ambulanceSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    liveLocation: {
        type: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    normalUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NormalUser'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
}, { timestamps: true });

export const Ambulance = User.discriminator('Ambulance', ambulanceSchema);
