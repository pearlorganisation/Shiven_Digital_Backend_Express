import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      unique: true, // Prevent duplicate plan names
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      // We will auto-generate this, so it's not required in the request body
    },
    description: { 
      type: String,
      trim: true 
    },
    price: {
      monthly: { type: Number, required: true, min: 0 },
      yearly: { type: Number, required: true, min: 0 },
    },
    currency: { 
      type: String, 
      default: "INR",
      uppercase: true
    },
    
    // Module 2 Requirement: Free Trials
    trialDays: {
      type: Number,
      default: 0, // 0 means no trial, 7 or 14 means free trial
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
      removeBranding: { type: Boolean, default: false }, // Common SaaS feature
    },

    isActive: { 
      type: Boolean, 
      default: true 
    },
    
    // For sorting plans on the UI (e.g., Basic -> Pro -> Enterprise)
    sortOrder: {
      type: Number,
      default: 0
    }
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

  next();
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;