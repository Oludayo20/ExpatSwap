import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true // Removes leading/trailing whitespace
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },

    phoneNum: {
      type: String,
      required: true,
      maxlength: 15, // Assuming a maximum of 15 digits for phone numbers
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Enforces unique emails
      lowercase: true, // Stores emails in lowercase for consistency
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
