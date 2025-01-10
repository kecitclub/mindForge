import { Ambulance } from "../models/ambulance.model";
import { FireBrigade } from "../models/fireBrigade.model";
import { NormalUser } from "../models/normalUser.model";
import { Police } from "../models/police.model";

export const getAllLocations = async (userId, latitude, longitude) => {
    try {
        const user = await NormalUser.findById(userId);
        if (!user) {
            throw new AppError('User not found!', 404);
        }

        user.liveLocation = { latitude, longitude };
        await user.save();

        const radius = 10; // Radius in kilometers
        const nearbyAmbulances = await Ambulance.find({
            liveLocation: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radius / 6378.1], // earth's radius in km
                },
            },
        });

        const nearbyPoliceStations = await Police.find({
            policeStationLocation: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radius / 6378.1], // earth's radius in km
                },
            },
        });

        const nearbyFireBrigades = await FireBrigade.find({
            liveLocation: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radius / 6378.1], // earth's radius in km
                },
            },
        });

        return {
            nearbyAmbulances,
            nearbyPoliceStations,
            nearbyFireBrigades
        };
    } catch (error) {
        throw new AppError(error.message, error.statusCode)
    }
};