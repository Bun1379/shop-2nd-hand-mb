import axios from "axios";
import queryString from "query-string";
import { Alert } from "react-native"; // Để hiển thị cảnh báo
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const BASE_URL = `http://192.168.232.219:3000/api/v1`; // Đổi địa chỉ IP cho phù hợp
// Tạo axios client chung
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => queryString.stringify(params),
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token"); // Dùng await để đợi token được lấy ra
      if (!token) {
        Alert.alert("Thông báo", "Vui lòng đăng nhập lại.");
        return Promise.reject(
          new Error("Không có token, vui lòng đăng nhập lại.")
        );
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosClient, axiosPrivate };
