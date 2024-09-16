import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthorAPI from "../../API/AuthorAPI";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Kiểm tra nếu email hoặc password rỗng
    if (!email || !password) {
      Alert.alert("Lỗi", "Email và mật khẩu không được để trống.");
      return;
    }

    try {
      const response = await AuthorAPI.Login({
        email,
        password,
      });

      if (response.data.EM === "Login successfully") {
        await AsyncStorage.setItem("token", response.data.DT.token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data.DT.user)
        );
        if (response.data.DT.user.is_verified === false) {
          Alert.alert("Thông báo", "Đăng nhập thành công!");
          navigation.navigate("VerifyUser", { email });
        } else {
          Alert.alert("Thông báo", "Đăng nhập thành công!");
          navigation.navigate("Navigation");
        }
      } else {
        Alert.alert("Đăng nhập thất bại", response.data.message);
        console.error("Chi tiết lỗi:", response.data.message);
      }
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
      Alert.alert("Lỗi", error.message || "Đã xảy ra lỗi");
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-2xl mb-5 text-center">Đăng nhập</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-5 px-2"
        placeholder="Tên đăng nhập"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="h-10 border border-gray-400 mb-5 px-2"
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sử dụng Tailwind CSS để style các nút */}
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mb-3"
        onPress={handleLogin}
      >
        <Text className="text-white text-center">Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 p-3 rounded mb-3"
        onPress={() => navigation.navigate("Signup")}
      >
        <Text className="text-white text-center">Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-yellow-500 p-3 rounded mb-3"
        onPress={() => navigation.navigate("ForgotPW")}
      >
        <Text className="text-white text-center">Quên mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
