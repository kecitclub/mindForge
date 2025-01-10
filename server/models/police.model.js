import mongoose from "mongoose";
import { User } from "./user.model.js";

const policeSchema = new mongoose.Schema({
    policeStationLocation: {
        type: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const Police = User.discriminator('Police', policeSchema);