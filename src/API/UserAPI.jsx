import { axiosClient, axiosPrivate } from "./AxiosClient";

class UserAPI {
    static async UpdateUser(data) {
        const url = "/user/update";
        return axiosPrivate.put(url, data);
    }
}

export default UserAPI;