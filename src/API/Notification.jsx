import { axiosClient, axiosPrivate } from "./AxiosClient";

class NotificationAPI {
  static async GetNotifications() {
    const url = "/notification";
    return axiosPrivate.get(url);
  }
}

export default NotificationAPI;
