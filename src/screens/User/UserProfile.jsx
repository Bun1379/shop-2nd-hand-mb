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
  });

  // Function to fetch user data from AsyncStorage
  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser); // Update the entire userInfo object
      }
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
    }
  };

  // Use useEffect to fetch data when component mounts and when screen is focused
  useEffect(() => {
    const focusListener = navigation.addListener("focus", getUserData);

    // Cleanup listener automatically handled by returning this cleanup function
    return focusListener;
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-[#F2F7FF] px-10">
      <View className="justify-center items-center p-5 w-40 h-40 bg-white shadow-lg rounded-full mb-6">
        <Image
          source={require("../../../assets/edit.jpg")}
          style={{ width: 160, height: 160, borderRadius: 80 }}
        />
      </View>
      <View className="bg-white w-full p-6 rounded-xl shadow-md">
        <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
          Thông tin cá nhân
        </Text>
        <View className="space-y-3">
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium text-gray-600">Tên:</Text>
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
          className="bg-blue-500 p-3 rounded mt-6"
          onPress={() => navigation.navigate("UpdateUser", { userInfo })}
        >
          <Text className="text-lg text-white text-center">Cập nhật</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mt-6"
        onPress={() => navigation.navigate("Order", { initStatus: "PENDING" })}
      >
        <Text>Go to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserProfile;
