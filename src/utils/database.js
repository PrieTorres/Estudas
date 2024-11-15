import User from '@/models/user';
import mongoose from 'mongoose';

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "pixel_burguer",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await User.syncIndexes();
    isConnected = true;

    console.info('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
}