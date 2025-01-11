import { Ambulance } from "../models/ambulance.model.js";
import { User } from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const acceptRequest = catchAsync(async (req, res) => {
  const ambulanceId = req.user._id;
  const { patientId } = req.body;

  if (!ambulanceId || !patientId) {
    throw new AppError(
      "Missing required fields: ambulanceId or patientId.",
      400
    );
  }

  try {
    const ambulance = await Ambulance.findById(ambulanceId);
    if (!ambulance) {
      throw new AppError("Ambulance not found.", 404);
    }

    const patient = await User.findById(patientId);
    if (!patient) {
      throw new AppError("User not found.", 404);
    }

    ambulance.patient = patientId;
    ambulance.status = "unavailable";
    await ambulance.save();

    patient.waitingStatus = "pending";
    patient.ambulanceAssigned = ambulanceId;
    await patient.save();

    // Step 4: Notify both parties (mocked in this example)
    return res.status(200).json({
      status: "success",
      message:
        "Ambulance has accepted the request and is en-route to the patient.",
      ambulance: {
        id: ambulance._id,
        driver: ambulance.fullName,
        location: ambulance.liveLocation,
      },
      patient: {
        id: patient._id,
        name: patient.fullName,
        location: patient.location,
      },
    });
  } catch (error) {
    throw new AppError(error.message, error.statusCode);
  }
});

export const updateAmbulanceLocation = async (lat, lng) => {
  const { ambulanceId } = req.user._id;

  if (!lat || !lng) {
    throw new AppError("latitude and Longitude are required", 400);
  }

  try {
    const ambulance = await Ambulance.findById(ambulanceId);

    if (!ambulance) {
      throw new AppError("Ambulance not found", 404);
    }

    ambulance.liveLocation = { lat, lng };
    await ambulance.save();
  } catch (err) {
    console.error(err);
  }
};
