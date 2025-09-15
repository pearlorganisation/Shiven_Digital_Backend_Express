import mongoose from "mongoose";

class MongooseService {
  // ✅ Validate ObjectId
  static isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

}

export default MongooseService;
