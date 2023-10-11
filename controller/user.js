import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/feature.js"
import ErrorHandler from "../middlewares/error.js"


export const register = async (req, res, next) => { // Add 'next' as an argument
    try {
        const { name, email, password } = req.body
        let user = await User.findOne({ email })
        if (user) return next(new ErrorHandler("User already Exist", 400))
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword })

        sendCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return next(new ErrorHandler("Invalid Email or Password", 400));

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res, next) => { // Add 'next' as an argument

    try {
        res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true
        })
    } catch (error) {
        next(error)
    }
}

export const getUserDetails = async (req, res, next) => { // Add 'next' as an argument

    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}
