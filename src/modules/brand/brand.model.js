import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  country: { type: String },
  city: { type: String },
  location: { type: String },
});

const socialSchema = new mongoose.Schema({
  instagram: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  linkedin: { type: String },
});

const brandSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    logo: {
      type: String,
    },

    description: {
      type: String,
    },

    website: {
      type: String,
    },

    contact: {
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
      },
      phone: {
        type: String,
      },
      address: addressSchema,
    },

    social: socialSchema,

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);
