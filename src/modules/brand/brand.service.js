// brand.service.js - brand module

import Brand from "./brand.model.js";

const isDev = () => process.env.NODE_ENV === "development";

class BrandService {
  //  Create a new brand
  static async create(data) {
    try {
      const brand = await Brand.create(data);
      return {
        success: true,
        message: "Brand created successfully",
        data: { brand },
      };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  //  Get all brands for a specific user
  static async getByUserId(userId) {
    try {
      const brands = await Brand.find({ userId }).sort({ createdAt: -1 });
      return {
        success: true,
        message: "Brands fetched successfully",
        data: { brands },
      };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  //  Get single brand by ID
  static async getById(brandId) {
    try {
      const brand = await Brand.findById(brandId);
      if (!brand) {
        return { success: false, message: "Brand not found", data: null };
      }
      return {
        success: true,
        message: "Brand fetched successfully",
        data: { brand },
      };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  //  Update brand
  static async update(brandId, data) {
    try {
      const brand = await Brand.findByIdAndUpdate(
        brandId,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );

      if (!brand) {
        return { success: false, message: "Brand not found", data: null };
      }

      return {
        success: true,
        message: "Brand updated successfully",
        data: { brand },
      };
    } catch (error) {
      return {
        success: false,
        message: isDev() ? error.message : "Internal Server Error",
        data: null,
      };
    }
  }

  //  Delete brand
  static async delete(brandId) {
    try {
      const brand = await Brand.findByIdAndDelete(brandId);

      if (!brand) {
        return { success: false, message: "Brand not found", data: null };
      }

      return {
        success: true,
        message: "Brand deleted successfully",
        data: { brand },
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

export default BrandService;
