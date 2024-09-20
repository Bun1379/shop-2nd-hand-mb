import { axiosClient, axiosPrivate } from "./AxiosClient";

class CartAPI {
  static async GetCart() {
    const url = "/cart";
    return axiosPrivate.get(url);
  }

  static async UpdateQuantity(data) {
    const url = `/cart`;
    console.log(data);
    return axiosPrivate.put(url, data);
  }
}

export default CartAPI;
