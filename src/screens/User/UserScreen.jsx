import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const UserPage = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState("");

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

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token");

            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView className="bg-gray-100 mt-2 ">
      {/* Thông tin người dùng */}
      <View className="bg-white p-4 flex-row items-center border border-primary">
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
        <TouchableOpacity
          className="p-4 border-b border-gray-200"
          onPress={() => navigation.navigate("Mã giảm giá")}
        >
          <Text className="text-base text-primary">Mã giảm giá của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-4 border-b border-gray-200"
          onPress={() => navigation.navigate("Sản phẩm yêu thích")}
        >
          <Text className="text-base text-primary">Sản phẩm yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-4 border-b border-gray-200"
          onPress={() => navigation.navigate("Sổ địa chỉ")}
        >
          <Text className="text-base text-primary">Sổ địa chỉ</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4" onPress={handleLogout}>
          <Text className="text-base text-primary">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserPage;
