import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const UserPage = () => {
  const navigation = useNavigation();
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
  getUserData();
  return (
    <ScrollView className="bg-gray-100">
      {/* Thông tin người dùng */}
      <View className="bg-white p-4 flex-row items-center">
        <Image
          source={{
            uri: userInfo.image
              ? userInfo.image
              : "https://via.placeholder.com/150",
          }}
          className="w-16 h-16 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-lg font-bold">{userInfo.username}</Text>
        </View>
      </View>

      {/* Cài đặt tài khoản */}
      <View className="mt-4 bg-white">
        <TouchableOpacity
          className="p-4 border-b border-gray-200"
          onPress={() =>
            navigation.navigate("Order", { initStatus: "PENDING" })
          }
        >
          <Text className="text-base text-primary">Đơn hàng của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-4 border-b border-gray-200"
          onPress={() => navigation.navigate("Sản phẩm đã mua")}
        >
          <Text className="text-base text-primary">Sản phẩm đã mua</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-4 border-b border-gray-200"
          onPress={() => navigation.navigate("Thông tin cá nhân")}
        >
          <Text className="text-base text-primary">Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 border-b border-gray-200">
          <Text className="text-base text-primary">Trung tâm hỗ trợ</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4">
          <Text className="text-base text-primary">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserPage;
