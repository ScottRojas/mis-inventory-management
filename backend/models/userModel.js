import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
        enum: {
            values: [
                "Warehouse",
                "Maintenance",
                "Operations",
                "Quality",
                "HSE",
                "Engineering",
                "Facilities",
                "Grounds",
                "Housekeeping",
                "Temporary",
            ],
            message: "Please add a valid user department",
        },
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    procurement: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true, // Enable automatic creation of `createdAt` and `updatedAt`
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
