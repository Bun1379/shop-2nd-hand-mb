import { axiosClient, axiosPrivate } from "./AxiosClient";

class UploadAPI {
  static async Upload(formData) {
    const url = "/upload";
    // const formData = new FormData();
    // formData.append("image", file);
    return axiosPrivate.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default UploadAPI;
