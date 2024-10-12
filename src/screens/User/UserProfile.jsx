import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useEffect(() => {
    const focusListener = navigation.addListener("focus", getUserData);

    return focusListener;
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-[#F2F7FF] px-10">
      <View className="justify-center items-center p-5 w-40 h-40 bg-white shadow-lg rounded-full mb-6">
        <Image
          source={{
            uri: userInfo.image ? userInfo.image : 'https://via.placeholder.com/150'
          }}
          style={{ width: 160, height: 160, borderRadius: 80 }}
        />
      </View>
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
            <Text className="text-lg text-gray-800">{userInfo.gender}</Text>
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
          onPress={() => navigation.navigate("Cập nhật thông tin", { userInfo })}
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
