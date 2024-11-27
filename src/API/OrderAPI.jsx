import { axiosClient, axiosPrivate } from "./AxiosClient";

class OrderAPI {
  static async GetOrders() {
    const url = "/order";
    return axiosPrivate.get(url);
  }

  static async CreateOrder(data) {
    const url = "/order";
    return axiosPrivate.post(url, data);
  }

  static async GetOrderById(orderId) {
    const url = `/order/${orderId}`;
    return axiosPrivate.get(url);
  }

  static async GetProductPurchased() {
    const url = "/order/product-purchased";
    return axiosPrivate.get(url);
  }
}

export default OrderAPI;
