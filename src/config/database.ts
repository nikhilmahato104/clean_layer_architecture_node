import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const uri = process.env['MONGO_URI'];
  if (!uri) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB Atlas connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', (err as Error).message);
    process.exit(1);
  }
};
