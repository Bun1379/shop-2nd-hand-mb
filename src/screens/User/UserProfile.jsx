import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import UploadAPI from "../../API/UploadAPI";
import UserAPI from "../../API/UserAPI";

function UserProfile({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
    image: "",
  });

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser);
      }
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
    }
  };

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert("Quyền truy cập thư viện hình ảnh không được cấp.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;

      try {
        // Lấy blob từ ảnh
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        // Tạo đối tượng FormData
        const formData = new FormData();
        formData.append("image", {
          uri: selectedImage, // URI của ảnh
          name: "photo.jpg", // Tên file (tuỳ chọn, nên đặt)
          type: blob.type || "image/jpeg", // Định dạng mime type
        });

        // Gọi API để upload ảnh
        const uploadResponse = await UploadAPI.Upload(formData);

        await UserAPI.UpdateUser({ image: uploadResponse.data.DT });

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          image: selectedImage,
        }));
        AsyncStorage.setItem(
          "user",
          JSON.stringify({ ...userInfo, image: selectedImage })
        );
      } catch (error) {
        console.error(
          "Error uploading avatar:",
          error.response?.data?.EM || error.message
        );
      }
    } else {
      console.log("Người dùng đã hủy chọn ảnh");
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", getUserData);
    return focusListener;
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-[#F2F7FF] px-10">
      <TouchableOpacity onPress={handleImagePick} className="mb-6">
        <View className="justify-center items-center p-5 w-40 h-40 bg-white shadow-lg rounded-full">
          <Image
            source={{
              uri: userInfo.image
                ? userInfo.image
                : "https://via.placeholder.com/150",
            }}
            style={{ width: 160, height: 160, borderRadius: 80 }}
          />
        </View>
      </TouchableOpacity>
      <View className="bg-white w-full p-6 rounded-xl shadow-md">
        <View className="space-y-3">
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium text-gray-600">Họ Tên:</Text>
            <Text className="text-lg text-gray-800">{userInfo.username}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium text-gray-600">Email:</Text>
            <Text className="text-lg text-gray-800">{userInfo.email}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium text-gray-600">
              Giới tính:
            </Text>
            <Text className="text-lg text-gray-800">
              {userInfo.gender === "MALE"
                ? "Nam"
                : userInfo.gender === "FEMALE"
                ? "Nữ"
                : userInfo.gender === "OTHER"
                ? "Khác"
                : userInfo.gender}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium text-gray-600">
              Điện thoại:
            </Text>
            <Text className="text-lg text-gray-800">{userInfo.phone}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium text-gray-600">Địa chỉ:</Text>
            <Text className="text-lg text-gray-800">{userInfo.address}</Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-primary p-3 rounded mt-6"
          onPress={() =>
            navigation.navigate("Cập nhật thông tin", { userInfo })
          }
        >
          <Text className="text-lg text-white text-center">Cập nhật</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary p-3 rounded mt-3"
          onPress={() => navigation.navigate("Đổi mật khẩu", { userInfo })}
        >
          <Text className="text-lg text-white text-center">Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserProfile;
