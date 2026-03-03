import mongoose from "mongoose";
import { uppercase } from "zod";


const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      uppercase: true,
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountType: {
      type: String,
      enum: ["flat", "percentage"],
      default: null,
    },

    // Discount Amount
    discountAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },
    trialDays: {
      type: Number,
      default: 0,
    },

    // Module 1 & 14: Limits for the SaaS Platform
    limits: {
      maxUsers: { type: Number, default: 1 },
      maxSocialAccounts: { type: Number, default: 3 },
      monthlyEmails: { type: Number, default: 1000 },
      monthlySms: { type: Number, default: 100 },
      monthlyWhatsapp: { type: Number, default: 100 },
      storageSpaceMB: { type: Number, default: 1024 }, // 1 GB
    },

    // Feature Flags
    features: {
      aiContentWriter: { type: Boolean, default: false },
      premiumTemplates: { type: Boolean, default: false },
      advancedAnalytics: { type: Boolean, default: false },
      apiAccess: { type: Boolean, default: false },
      removeBranding: { type: Boolean, default: false },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // For sorting plans on the UI (e.g., Basic -> Pro -> Enterprise)
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


planSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = this.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces with -
    .replace(/^-+|-+$/g, ""); // Trim -

    if (this.discountType && !this.discountAmount) {
        return next(
          new Error("Discount amount is required when discount type is set")
        );
      }

      if (!this.discountType) {
        this.discountAmount = 0;
      }

  next();
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;