import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbUrl = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URL : process.env.MONGODB_URL;
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export default connectDB;
