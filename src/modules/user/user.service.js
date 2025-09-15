import User from "./user.model.js";
import BcryptService from "../../utils/commonService/bcrypt.service.js";

const isDev = process.env.NODE_ENV === "development";

class UserService {
  // 🔎 Find user by email
  static async findByEmail(email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return { success: false, message: "User not found", data: null };
      }

      return { success: true, message: "User found", data: user };
    } catch (error) {
      return {
        success: false,
        message: isDev ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  // 📝 Register new user 
  static async register(data) {
    try {
      const hashedPassword = await BcryptService.hashValue(data.password);
      const user = await User.create({ ...data, password: hashedPassword });

      return { success: true, message: "User registered", data: user };
    } catch (error) {
      return {
        success: false,
        message: isDev ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  // 🔐 Login user
  static async login({ email, password }) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return { success: false, message: "Invalid credentials", data: null };
      }

      const isMatch = await BcryptService.compareValue(password, user.password);
      if (!isMatch) {
        return { success: false, message: "Invalid credentials", data: null };
      }


      return {
        success: true,
        message: "Login successful",
        data: { user },
      };
    } catch (error) {
      return {
        success: false,
        message: isDev ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }
}

export default UserService;
