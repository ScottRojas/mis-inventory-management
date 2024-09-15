import mongoose from 'mongoose';

export const db = async () => {
    try {
        const link = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully to ${link.connection.host} on Atlas.`);
    } catch (error) {
        console.log(`Error connecting to the MongoDB database: ${error.message}`);
        process.exit(1)
    }
}

export default db;