import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri: string = process.env.MONGO_URI!;

  try {
    await mongoose.connect(uri);
    console.log(`Connected successfully ️🎉`);
  } catch (error) {
    console.log(`Connect failed ⛔`);
  }
};
