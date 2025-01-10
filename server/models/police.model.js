import mongoose from "mongoose";
import { User } from "./user.model.js";

const policeSchema = new mongoose.Schema({
    policeStationLocation: {
        type: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const Police = User.discriminator('Police', policeSchema);