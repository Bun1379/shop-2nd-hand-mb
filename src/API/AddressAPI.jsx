import { axiosClient, axiosPrivate } from "./AxiosClient";

class AddressAPI {
    static async CreateAddress(data) {
        const url = "/address";
        return axiosPrivate.post(url, data);
    }

    static async UpdateAddress(id, data) {
        const url = `/address/${id}`;
        return axiosPrivate.put(url, data);
    }

    static async DeleteAddress(id) {
        const url = `/address/${id}`;
        return axiosPrivate.delete(url);
    }

    static async GetAddressByUser() {
        const url = "/address";
        return axiosPrivate.get(url);
    }

    static async SetDefaultAddress(id) {
        const url = `/address/default/${id}`;
        return axiosPrivate.put(url);
    }

    static async CheckAddress(params = {}) {
        const url = `/address/checkAddress`;
        return axiosClient.get(url, { params });
    }
}
export default AddressAPI