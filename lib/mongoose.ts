import mongoose from "mongoose" 

let isConnected = false; 
const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MONGODB_URL is not found') ;
    if (isConnected) return console.log('Already connected to the database') ;

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('Connected to the database') ;
    } catch (error) {
        console.error(error) ;
    }
}

export default connectDB ;