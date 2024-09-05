import mongoose from 'mongoose';

let isConnected = false; // track the connection

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

    isConnected = true;

    console.info('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
}