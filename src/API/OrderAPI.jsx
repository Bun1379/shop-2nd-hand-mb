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
}

export default OrderAPI;
