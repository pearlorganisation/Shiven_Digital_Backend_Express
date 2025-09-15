import mongoose from "mongoose";

class MongooseService {
  // ✅ Validate ObjectId
  static isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  static cleanObject = (doc) => {
  if (!doc) return null;

  // Convert Mongoose doc to plain JS object if needed
  const obj = doc.toObject ? doc.toObject() : { ...doc };

  // Fields to remove
  const removeFields = ["isDeleted", "createdAt", "updatedAt", "__v" ,"password"];

  removeFields.forEach((field) => {
    if (field in obj) {
      delete obj[field];
    }
  });

  return obj;
};

}

export default MongooseService;
