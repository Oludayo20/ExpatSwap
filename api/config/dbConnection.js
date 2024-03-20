import mongoose from 'mongoose';

class DatabaseConnector {
  constructor() {
    mongoose.set('strictQuery', false);
    mongoose.set('strictPopulate', false);
  }

  async connect() {
    try {
      await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
      console.log(err);
    }
  }
}

export default DatabaseConnector;
