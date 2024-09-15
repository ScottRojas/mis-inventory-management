import {asyncHandler} from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, department } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
        res.status(403);
        throw new Error('User already exists.');
    }

    const user = await User.create({
        name, email, password, department,
    });

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            department: user.department,
            procurement: user.procurement,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400)
        throw new Error('Invalid data, try again.');
    }
});


export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if (user && user.comparePassword(password)) {
        const token = generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            department: user.department,
            procurement: user.procurement,
            isAdmin: user.isAdmin,
            token: token,
        });
    } else {
        res.status(401)
        throw new Error('Unauthorized.');
    }
})