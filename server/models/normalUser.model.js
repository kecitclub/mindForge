import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";


const normalUserSchema = new Schema(
    {
        liveLocation: {
            type: {
                latitude: { type: Number },
                longitude: { type: Number }
            }
        },
    },
    { discriminatorKey: 'role', timestamps: true }
);

export const NormalUser = User.discriminator('NormalUser', normalUserSchema);