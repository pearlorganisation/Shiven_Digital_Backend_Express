import User from "./user.model.js";
import BcryptService from "../../utils/commonService/bcrypt.service.js";

const isDev = () => process.env.NODE_ENV === "development";

class UserService {
  static async findById(Id) {
    try {
      const user = await User.findById(Id);

      if (!user) {
        return { success: false, message: "User not found", data: null };
      }

      return { success: true, message: "User found", data: { user } };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  static async verifyUserEmail(id) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { isVerified: true },
        { new: true }
      );

      if (!user) {
        return { success: false, message: "User not found", data: null };
      }

      return { success: true, message: "Email verified", data: { user } };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  // 🔎 Find user by email
  static async findByEmail(email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return { success: false, message: "User not found", data: null };
      }

      return { success: true, message: "User found", data: { user } };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  // 📝 Register new user
  static async register(data) {
    try {
      const hashedPassword = await BcryptService.hashValue(data.password);
      const user = await User.create({ ...data, password: hashedPassword });

      return { success: true, message: "User registered Successfully", data: { user } };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  // 🔐 Login user
  static async login({ password, hashPassword }) {
    try {
      const isMatch = await BcryptService.compareValue(password, hashPassword);
      if (!isMatch) {
        return { success: false, message: "Invalid credentials", data: null };
      }

      return {
        success: true,
        message: "Login successful",
        data: {},
      };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }
}

export default UserService;
