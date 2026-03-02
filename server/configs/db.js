import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        await mongoose.connect(`${process.env.MONGO_URI}/car-rental`);
    } catch (error) {
        console.error(error.message);
    }
};

export default connectDB;
