import mongoose from "mongoose";


const priceType  = {
  type: Number, 
  min: 0 

}

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
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
      trim: true 
    },
   price: {
  monthly: priceType,

  quarterly: priceType,

  halfYearly: priceType,

  yearly: priceType
},
    currency: { 
      type: String, 
      default: "INR",
      uppercase: true
    },
    trialDays: {
      type: Number,
      default: 0, 
    },

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

planSchema.path("price").validate(function (value) {
  return (
    value?.monthly ||
    value?.quarterly ||
    value?.halfYearly ||
    value?.yearly
  );
}, "At least one pricing option is required");


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

planSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.slug = update.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  next();
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;