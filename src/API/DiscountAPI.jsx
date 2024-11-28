import { axiosClient, axiosPrivate } from "./AxiosClient";

class DiscountAPI {
  static async getDiscountByCode(coupon) {
    const url = "/discount/code";
    return axiosPrivate.get(url, { params: { discountCode: coupon } });
  }

  static async getDiscounts(params = {}) {
    const url = "/discount";
    return axiosPrivate.get(url, { params });
  }

  static async createDiscount(data) {
    const url = "/discount";
    return axiosPrivate.post(url, data);
  }

  static async getAllValidDiscount(data) {
    const url = "/discount/all";
    return axiosClient.get(url, data);
  }
}

export default DiscountAPI;
