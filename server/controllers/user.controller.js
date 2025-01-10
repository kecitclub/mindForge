import { User } from "../models/user.model.js"
import { catchAsync } from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { Hospital } from "../models/hospital.model.js"
import { Ambulance } from "../models/ambulance.model.js"

const register = catchAsync(async (req, res, next) => {
    const { fullName, email, password, phoneNumber, role, vehicleNumber, hospitalAddress, latitude, longitude, specialization, dob } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new AppError("The user with this email already exists", 400)
    }

    const newUser = await User.create({
        fullName,
        email,
        password,
        // role,
        phoneNumber,
    });

    // if (role === 'FireBrigade') {
    //     newUser = await User.create({
    //         fullName,
    //         email,
    //         password,
    //         role,
    //         phoneNumber,
    //         dob
    //     });
    // } else if (role === 'Ambulance') {
    //     newUser = await Ambulance.create({
    //         fullName,
    //         email,
    //         password,
    //         role,
    //         phoneNumber,
    //         vehicleNumber
    //     });
    // } else if (role === "Hospital") {
    //     newUser = await Hospital.create({
    //         fullName,
    //         email,
    //         password,
    //         role,
    //         phoneNumber,
    //         hospitalAddress,
    //         hospitalLocation: {
    //             latitude,
    //             longitude
    //         },
    //         specialization
    //     });
    // } else {
    //     throw new AppError("Inappropriate role!", 404)
    // }


    res.status(201).json({
        status: "success",
        message: "Account created successfully",
        data: newUser
    })
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await user.isPasswordCorrect(password))) {
        return next(new AppError("Incorrect email or password", 401))
    }

    const token = user.generateJwtToken()

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "strict",
    }

    user.password = undefined // should not show up even if its hashed
    user.createdAt = undefined
    user.updatedAt = undefined
    user.__v = undefined

    res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json({
            status: "success",
            message: "Account created successfully",
            user
        })
})

const logout = catchAsync(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now() - 1000),
            httpOnly: true,
        })
        .json({
            status: "success",
            message: "Logged out successfully!",
            data: null
        })
})

const ambulanceRequest = catchAsync(async (req, res, next) => {
    const patientId = req.user._id
    const { latitude, longitude } = req.body;

    if (!patientId || !latitude || !longitude) {
        throw new AppError('Missing required fields: patientId, latitude, or longitude.', 400);
    }

    try {
        const patient = await User.findById(patientId);
        if (!patient) {
            throw new AppError('User not found!', 404);
        }

        patient.location = { latitude, longitude };
        await patient.save();

        const radius = 10; // Radius in kilometers
        const nearbyAmbulances = await Ambulance.find({
            liveLocation: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radius / 6378.1], // earth's radius in km
                },
            },
        });

        // Step 3: Return the list of ambulances to the patient
        return res.status(200).json({
            status: "success",
            message: 'Nearby ambulances found.',
            ambulances: nearbyAmbulances,
        });
    } catch (error) {
        throw new AppError(error.message, error.statusCode)
    }
});

export {
    register, login, logout, ambulanceRequest
}